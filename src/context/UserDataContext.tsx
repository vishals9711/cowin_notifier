import PropTypes from 'prop-types';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { SLOT_ALERTS } from '../models/slot';
import { USER_DATA } from '../models/userData';

interface UserDataContextModel {
  userData: USER_DATA | null;
  setUserData: Dispatch<SetStateAction<USER_DATA | null>>;
  slotAlerts: Array<SLOT_ALERTS>;
  setSlotAlerts: Dispatch<SetStateAction<Array<SLOT_ALERTS>>>;
}

const UserDataContext = createContext<UserDataContextModel | null>(null);

type UserDataProviderProps = {
  children: ReactNode;
};

function UserDataProvider({
  children,
}: UserDataProviderProps): React.ReactElement {
  const [userData, setUserData] = useState<USER_DATA | null>(null);
  const [slotAlerts, setSlotAlerts] = useState<Array<SLOT_ALERTS>>([]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        slotAlerts,
        setSlotAlerts,
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
