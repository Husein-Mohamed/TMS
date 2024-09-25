import { useState } from 'react';
import { UpdateUserDialog } from './UpdateUser';
import { VerifyUserDialog } from './VerifyUser';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'User' | 'Admin';
}

export function EditUserProcess() {
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    return (
        <div>
            <VerifyUserDialog onUserVerified={setUserToEdit} />
            {userToEdit && <UpdateUserDialog user={userToEdit} />}
        </div>
    );
}
