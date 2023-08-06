import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { authOptions } from "@/app/api/auth/auth-options";
import Container from "@/components/layout/container";
import Unauthenticated from "@/components/template/unauthenticated";
import { prisma } from "@/prisma";

import AdditionalDetails from "./(components)/(additional details)/additional-details";
import UserPosts from "./(components)/(posts)/user-posts";
import ProfileCard from "./(components)/(profile card)/profile-card";
import SocialMedia from "./(components)/(social media)/social-media";
import AnimateSection from "./(components)/animate-section";

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

  const session = await getServerSession(authOptions);
  if (!session) return <Unauthenticated />;

  return (
    <Container className="min-h-[calc(100vh-72.6px-4rem)] h-full flex flex-col gap-3 justify-center w-max">
      <AnimateSection className="flex flex-col lg:flex-row gap-4 justify-between mt-40">
        <ProfileCard user={user} />
        <SocialMedia user={user} />
      </AnimateSection>

      <AnimateSection>
        <AdditionalDetails user={user} />
      </AnimateSection>

      <AnimateSection>
        <UserPosts user={user} />
      </AnimateSection>
    </Container>
  );
}
