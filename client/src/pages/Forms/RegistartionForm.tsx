import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { NavigationButtons } from '../../components/NavigationButtons';
import { ProgressBarWithIcons } from '../../components/ProgressBar';
import IconUser from '../../components/Icon/IconUser';
import IconBell from '../../components/Icon/IconBell';
import IconCamera from '../../components/Icon/IconCamera';
import IconLock from '../../components/Icon/IconLock';

type RepresentativeData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    institutionName: string;
    relationToInstitution: string;
    roleInInstitution: string;
    institutionCategory: string;
};

export default function RepresentativeDataForm({ onNext }: { onNext: (data: RepresentativeData) => void }) {
    const [currentStep, setCurrentStep] = useState(1);
    const icons = [<IconUser />, <IconBell />, <IconCamera />, <IconLock />];
    const totalSteps = 4;
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RepresentativeData>();

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        } else {
            return console.log('there were no steps left');
        }
    };
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const onSubmit = (data: RepresentativeData) => {
        console.log(data);
        onNext(data);
        navigate('/next-step');
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="background" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6  dark:bg-[#060818] sm:px-16">
                <div className="relative w-full max-w-[870px] rounded-lg bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[] py-10">
                    <div className="mx-auto">
                        <ProgressBarWithIcons currentStep={currentStep} totalSteps={totalSteps} icons={icons} />
                        <div className="mb-10 text-center">
                            <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Representative Information</h1>
                            <p className="text-base font-bold leading-normal text-white-dark">Please fill out the details below to proceed</p>
                        </div>
                        <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="firstName" className="font-bold">
                                        First Name
                                    </Label>
                                    <Input id="firstName" placeholder="Enter First Name" {...register('firstName', { required: 'First Name is required' })} />
                                    {errors.firstName && <span className="text-red-500 font-semibold">{errors.firstName.message}</span>}
                                </div>
                                <div>
                                    <Label htmlFor="lastName" className="font-bold">
                                        Last Name
                                    </Label>
                                    <Input id="lastName" placeholder="Enter Last Name" {...register('lastName', { required: 'Last Name is required' })} />
                                    {errors.lastName && <span className="text-red-500 font-semibold">{errors.lastName.message}</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="email" className="font-bold">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter Email"
                                        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                                    />
                                    {errors.email && <span className="text-red-500 font-semibold">{errors.email.message}</span>}
                                </div>
                                <div>
                                    <Label htmlFor="phoneNumber" className="font-bold">
                                        Phone Number
                                    </Label>
                                    <Input id="phoneNumber" placeholder="(000) 000-0000" {...register('phoneNumber', { required: 'Phone Number is required' })} />
                                    {errors.phoneNumber && <span className="text-red-500 font-semibold">{errors.phoneNumber.message}</span>}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="institutionName" className="font-bold">
                                    Institution Name
                                </Label>
                                <Input id="institutionName" placeholder="Institution Name" {...register('institutionName', { required: 'Institution Name is required' })} />
                                {errors.institutionName && <span className="text-red-500 font-semibold">{errors.institutionName.message}</span>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="relationToInstitution" className="font-bold">
                                        Relation to Institution
                                    </Label>
                                    <Input
                                        id="relationToInstitution"
                                        placeholder="Relation to Institution"
                                        {...register('relationToInstitution', { required: 'Relation to Institution is required' })}
                                    />
                                    {errors.relationToInstitution && <span className="text-red-500 font-semibold">{errors.relationToInstitution.message}</span>}
                                </div>
                                <div>
                                    <Label htmlFor="roleInInstitution" className="font-bold">
                                        Role in Institution
                                    </Label>
                                    <Input id="roleInInstitution" placeholder="Role in Institution" {...register('roleInInstitution', { required: 'Role in Institution is required' })} />
                                    {errors.roleInInstitution && <span className="text-red-500 font-semibold">{errors.roleInInstitution.message}</span>}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="institutionCategory" className="font-bold">
                                    Institution Category
                                </Label>
                                <Input id="institutionCategory" placeholder="Institution Category" {...register('institutionCategory', { required: 'Institution Category is required' })} />
                                {errors.institutionCategory && <span className="text-red-500 font-semibold">{errors.institutionCategory.message}</span>}
                            </div>

                            <NavigationButtons currentStep={currentStep} totalSteps={totalSteps} onNext={handleNext} onBack={handleBack} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
