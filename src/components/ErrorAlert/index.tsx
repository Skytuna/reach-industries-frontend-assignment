import { Alert } from 'flowbite-react';

export interface IErrorAlertProps {
    message: string;
}

export default function ErrorAlert({ message }: IErrorAlertProps) {
    return (
        <Alert color='failure'>
            <span>
                <span className='font-medium'>Error!</span> {message}
            </span>
        </Alert>
    );
}
