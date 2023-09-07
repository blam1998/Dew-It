import Image from 'next/image'
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import {currentUser, SignedIn, useAuth} from '@clerk/nextjs';
import { checkNewUser, addNewUser } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

export default async function Page() {
  const user = await currentUser();

  if (user){

    const userData = {
      id: user?.id || "",
      username: user?.username || "",
      name: user?.lastName? user?.firstName + ' ' + user?.lastName : user?.firstName ||   "",
    }

    const checkUser = await checkNewUser(userData);

    if (!checkUser){
      await addNewUser(userData);
    }
  }

  return (
    <main>
      <TopBar user = {user}/>
      <SignedIn>
        <main className = "flex flex-row gap-4 leftsidebar">
          <LeftSideBar/>
        </main>
      </SignedIn>
    </main>
  )
}
