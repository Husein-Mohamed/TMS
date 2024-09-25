import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';
import IconTrashLines from '../../../components/Icon/IconTrashLines';

export function DeleteUserDialog() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete('/api/deleteUser', { data: { email } });
            if (response.status === 200) {
                toast.success('User deleted successfully');
                window.location.reload();
            }
        } catch (error) {
            const axiosError = error as any;
            const errorMessage = axiosError.response?.data?.message || 'Error deleting user';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="relative w-full md:w-auto flex items-center justify-center rounded-md border px-5 py-2 text-sm font-semibold shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none bg-[#e7515a] text-white shadow-info/60">
                    <span className="pr-1">
                        <IconTrashLines />
                    </span>
                    Delete User
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                    <AlertDialogDescription>Enter the email of the user you want to delete.</AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <Input placeholder="User Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={handleDelete} disabled={loading}>
                            {loading ? 'Deleting...' : 'Delete User'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
