import { auth } from '@/lib/firebase';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

function NavbarExhibition({school}:any) {
    const photoUrl: string | StaticImport = auth.currentUser?.photoURL as string;
    return (
      <div className="border bg-teal-950">
        <div className="w-5/6 mx-auto flex justify-between items-center pt-4 pb-6">
          <Link href={`/transactions/${school}`}>
            <h1 className="text-teal-300 text-4xl font-bold block">
              青空教科書
            </h1>
          </Link>
          <div>
            <Link href={`/profile/${auth.currentUser?.uid}`}>
              <div className="bg-white rounded-full">
                <img
                  src={photoUrl}
                  alt="プロフィール写真"
                  height={50}
                  className="block border-double border-4 border-black rounded-full hover:opacity-80"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default NavbarExhibition