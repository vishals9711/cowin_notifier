import PropTypes from 'prop-types';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { USER_DATA } from '../models/userData';

interface UserDataContextModel {
  userData: USER_DATA | null;
  setUserData: Dispatch<SetStateAction<USER_DATA | null>>;
}

const UserDataContext = createContext<UserDataContextModel | null>(null);

type UserDataProviderProps = {
  children: ReactNode;
};

function UserDataProvider({
  children,
}: UserDataProviderProps): React.ReactElement {
  const [userData, setUserData] = useState<USER_DATA | null>(null);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const UserDataConsumer = UserDataContext.Consumer;

export { UserDataProvider, UserDataConsumer };
export default UserDataContext;
