import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'User' | 'Admin';
}
interface UpdateUserDialogProps {
    user: User;
}

export function UpdateUserDialog({ user }: UpdateUserDialogProps) {
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        password: '', // New password if needed
    });
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    // handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        console.log(`Input changed: ${id} = ${value}`);
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // handle selector change
    const handleRoleChange = (value: 'User' | 'Admin') => {
        console.log('Role changed to:', value);
        setFormData((prev) => ({
            ...prev,
            role: value,
        }));
    };

    // handle submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formDataWithCurrentEmail = {
                currentEmail: user.email,
                newEmail: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                role: formData.role,
                password: formData.password,
            };

            const response = await axios.put(`/api/updateUser`, formDataWithCurrentEmail);
            if (response.status === 400 && response.data) {
                toast.error(response.data.message || 'An error occurred');
            }
            toast.success('User updated successfully');
            setLoading(false);
            window.location.reload();
        } catch (error) {
            const axiosError = error as any;
            const errorMessage = axiosError.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-3xl w-full">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>Edit the user details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap justify-between -mx-2">
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="Password (leave blank to keep current)" type="password" onChange={handleInputChange} />
                        </div>
                        <div className="w-full px-2 mb-4">
                            <Label htmlFor="role">Role</Label>
                            <Select value={formData.role} onValueChange={(value) => handleRoleChange(value as 'User' | 'Admin')}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="User">User</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update User'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
