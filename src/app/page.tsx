import CountdownSection from './_components/countdown-section';
import SpekKegiatanSection from './_components/spek-section';

export default function Home() {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center'>
      <CountdownSection />
      <SpekKegiatanSection />
    </main>
  );
}
