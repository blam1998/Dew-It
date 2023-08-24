import Image from 'next/image'
import Intro from '@/components/shared/Intro';
import { Button } from '@/components/ui/button';
import {currentUser} from '@clerk/nextjs';
import { checkNewUser } from '@/lib/actions/user.actions';

export default async function Page() {
    const user = await currentUser();
    const userData = {
        id: user?.id || "",
        username: user?.username || "",
        name: user?.firstName? user.firstName : user?.lastName ||  "",
    }

    const checkUser = await checkNewUser(userData);
  return (
    <main className = "bg-black h-screen flex flex-col gap-4 items-center">
        <Intro/>
    </main>
  )
}
