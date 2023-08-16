import { notFound } from "next/navigation";

import Container from "@/components/layout/container";
import { MotionSection } from "@/components/motion-element";
import Unauthenticated from "@/components/template/unauthenticated";
import UserProvider from "@/context/user-provider";
import { prisma } from "@/prisma";

import AdditionalDetails from "./(components)/(additional_details)/additional-details";
import UserPosts from "./(components)/(posts)/user-posts";
import ProfileCard from "./(components)/(profile_card)/profile-card";
import SocialMedia from "./(components)/(social_media)/social-media";

export async function generateStaticParams() {
  const users = await prisma.user.findMany();

  return users.map((user) => ({
    nim: user.nim,
  }));
}

// Nanti buat params id ini bakal pake NIM, jadi klo mau liat profile orang lain tinggal masukin NIMnya aja, sama kalo pake UUID ribet awikwok
export default async function ProfilePage({
  params,
}: {
  params: { nim: string };
}) {
  const user = await prisma.user.findUnique({
    where: {
      nim: params.nim,
    },
  });

  if (!user) return notFound();

  return (
    <Container className="min-h-[calc(100vh-72.6px-4rem)] h-full flex flex-col gap-3 justify-center w-max">
      <UserProvider user={user}>
        <MotionSection
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
            delay: 0,
          }}
          className="flex flex-col lg:flex-row gap-4 justify-between mt-40"
        >
          <ProfileCard user={user} />
          <SocialMedia />
        </MotionSection>

        <MotionSection
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
            delay: 0,
          }}
        >
          <AdditionalDetails />
        </MotionSection>

        <MotionSection
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
            delay: 0,
          }}
        >
          <UserPosts />
        </MotionSection>
      </UserProvider>
    </Container>
  );
}
