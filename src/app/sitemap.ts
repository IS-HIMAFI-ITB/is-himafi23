import { prisma } from "@/prisma";

const URL = "https://ishimafiitb.com";

export default async function sitemap() {
  const siswa = await prisma.user.findMany();
  const tugas = await prisma.tugas.findMany();

  const siswaURL = siswa.map(({ nim }) => ({
    url: `${URL}/profile/${nim}`,
  }));

  const tugasURL = tugas.map(({ id }) => ({
    url: `${URL}/tugas/${id}`,
  }));

  const nilaiURL = tugas.flatMap((tugas) => {
    return siswa.map((siswa) => {
      return {
        url: `${URL}/kelas/tugas/${tugas.id}/nilai/${siswa.nim}`,
      };
    });
  });

  const editURL = tugas.map(({ id }) => ({
    url: `${URL}/kelas/tugas/${id}/edit`,
  }));

  const routes = ["", "/kelas", "/leaderboard", "/kelas/tugas/create"].map(
    (route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
    })
  );

  return [...routes, ...siswaURL, ...tugasURL, ...nilaiURL, ...editURL];
}
