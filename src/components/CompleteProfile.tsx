import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { twMerge } from "tailwind-merge";
import Logo from "./Logo";
import ThemeSwitch from "./theme-switch";
import Link from "next/link";

interface CompleteProfileProps {
  className?: string;
}

const CompleteProfile: React.FC<CompleteProfileProps> = ({
  className
}) => {
    return ( 
        <Card className={twMerge('flex-col', className)}>
  <CardHeader>
    <ThemeSwitch/>
    <div className="flex justify-center items-center"><Logo/></div>
    <CardTitle>Complete your profile</CardTitle>
    <CardDescription>Complete the remaining data to continue registration</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className='grid w-full items-center gap-4'>
        <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" placeholder="Masukkan nama lengkap" />
        </div>
        <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">NIM</Label>
              <Input id="name" placeholder="Masukkan NIM" />
        </div>
        <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nomor HP</Label>
              <Input id="name" placeholder="Masukkan nomor HP yang dapat dihubungi" />
        </div>
        
      </div>
    </form>
  </CardContent>
  <CardFooter>
    <Button>Continue</Button>
    <Button asChild className="ml-2 bg-slate-400 hover:bg-red-300">
      <Link href={'/login'}>Back</Link>
    </Button>
  </CardFooter>
</Card>
     );
}
 
export default CompleteProfile;