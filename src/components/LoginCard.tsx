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
import GoogleImage from "./GoogleIcon";
import Logo from "./Logo";
import ThemeSwitch from "./theme-switch";

interface LoginCardProps {
  className?: string;
}

const LoginCard: React.FC<LoginCardProps> = ({
  className
}) => {
    return ( 
        <Card className={twMerge('flex-col', className)}>
  <CardHeader>
    <ThemeSwitch/>
    <div className="flex justify-center items-center"><Logo/></div>
    <CardTitle>Log in</CardTitle>
    <CardDescription>Log in with your account</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className='grid w-full items-center gap-4'>
        <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input id="name" placeholder="Enter your username" />
        </div>
        <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="name" placeholder="Enter your password" />
        </div>
        
      </div>
    </form>
  </CardContent>
  <CardFooter>
    <Button>Log in</Button>
    <Button className='ml-4 bg-slate-300 text-black hover:bg-slate-200'>
      <GoogleImage/>
      <div>Log in with Google</div>
    </Button>
  </CardFooter>
</Card>
     );
}
 
export default LoginCard;