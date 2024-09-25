import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import IconPlus from '../../../components/Icon/IconPlus';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogClose, DialogTitle, DialogDescription } from '../../../components/ui/dialog';

export const CreateUser = () => {
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'User' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        setNewUser((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        console.log(id, value);
    };
    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeoutId: NodeJS.Timeout;

        return (...args: any[]) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };
    const debouncedInputChange = debounce(handleInputChange, 300);

    // handle submit
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/api/createUser', newUser);
            if (response.status === 400 && response.data) {
                toast.error(response.data);
            } else {
                setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'User' });
                toast.success('Created User successfully');
                setLoading(false);
                navigate('/');
            }
        } catch (error) {
            const axiosError = error as any;
            const errorMessage =
                axiosError.response && axiosError.response.data
                    ? Array.isArray(axiosError.response.data)
                        ? axiosError.response.data.join(', ') // Join array of error messages into a single string
                        : axiosError.response.data // Assume it's a string
                    : 'An error occurred during registration.';

            toast.error(errorMessage);
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="relative w-full md:w-auto flex items-center justify-center rounded-md border px-5 py-2 text-sm font-semibold shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none bg-[#00ab55] text-white shadow-info/60">
                        <span className="pr-1">
                            <IconPlus />
                        </span>
                        Create User
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full">
                    <DialogHeader>
                        <DialogTitle>Create User</DialogTitle>
                        <DialogDescription>Create a new user by filling out the form below.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitForm}>
                        <div className="flex flex-wrap justify-between -mx-2">
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="First Name" onChange={debouncedInputChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Last Name" onChange={debouncedInputChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Email" type="email" onChange={debouncedInputChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Password" type="password" required onChange={debouncedInputChange} />
                            </div>
                            <div className="w-full px-2 mb-4">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    required
                                    onValueChange={(value) => {
                                        handleInputChange({ target: { id: 'role', value } } as React.ChangeEvent<HTMLInputElement>);
                                    }}
                                >
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">{loading ? 'Creating' : 'Create'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
