export interface IMainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: IMainLayoutProps) {
    return <div className='bg-slate-100 w-screen h-screen p-4'>{children}</div>;
}
