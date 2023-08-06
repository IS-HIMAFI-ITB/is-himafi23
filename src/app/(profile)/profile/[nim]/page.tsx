import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { authOptions } from "@/app/api/auth/auth-options";
import Container from "@/components/layout/container";
import Unauthenticated from "@/components/template/unauthenticated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/prisma";

import AdditionalDetails from "./(components)/(additional details)/additional-details";
import UserPosts from "./(components)/(posts)/posts";
import ProfileCard from "./(components)/(profile card)/profile-card";
import SocialMedia from "./(components)/(social media)/social-media";

// Nanti buat params id ini bakal pake NIM, jadi klo mau liat profile orang lain tinggal masukin NIMnya aja, sama kalo pake UUID ribet awikwok
export default async function ProfilePage({
  params,
}: {
  params: { nim: number };
}) {
  const user = await prisma.user.findUnique({
    where: {
      nim: params.nim.toString(),
    },
  });

  if (!user) return notFound();

  const session = getServerSession(authOptions);
  if (!session) return <Unauthenticated />;

  // TODO: Tambahin animasi pake ini
  //  initial={{ opacity: 0, y: 100 }}
  // animate={{ opacity: 1, y: 0 }}
  // transition={{
  //   duration: 0.8,
  //   ease: [0, 0.71, 0.2, 1.01],
  //   delay: 0,
  // }}

  return (
    <Container className="min-h-[calc(100vh-72.6px-4rem)] h-full flex flex-col gap-3 justify-center w-max">
      <div className="flex flex-col lg:flex-row gap-4 justify-between mt-40">
        <ProfileCard user={user} />
        <SocialMedia user={user} />
      </div>

      <div>
        <AdditionalDetails user={user} />
      </div>

      <div>
        <Card className="bg-background w-[370px] lg:w-[836px] xl:w-[1136px]">
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <UserPosts data={[user]} />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
