import { prisma } from "@/prisma";

const URL = "https://ishimafiitb.com";

export default async function sitemap() {
  const siswa = await prisma.user.findMany();
  const tugas = await prisma.tugas.findMany();

  const siswaURL = siswa.map(({ nim }) => ({
    url: `${URL}/profile/${nim}`,
    lastModified: new Date().toISOString(),
  }));

  const tugasURL = tugas.map(({ id, updatedAt }) => ({
    url: `${URL}/tugas/${id}`,
    lastModified: new Date(updatedAt).toISOString(),
  }));

  const nilaiURL = tugas.flatMap((tugas) => {
    return siswa.map(({ id }) => ({
      url: `${URL}/tugas/${tugas.id}/nilai/${id}`,
      lastModified: new Date(tugas.updatedAt).toISOString(),
    }));
  });

  const editURL = tugas.map(({ id, updatedAt }) => ({
    url: `${URL}/kelas/tugas/${id}/edit`,
    lastModified: new Date(updatedAt).toISOString(),
  }));

  const routes = [
    "",
    "/kelas",
    "/kelas/tugas/create",
    "/login",
    "/login/verify",
    "/login/continue",
    "/login/unauthorized",
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...siswaURL, ...tugasURL, ...nilaiURL, ...editURL];
}
