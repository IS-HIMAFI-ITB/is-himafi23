import React from 'react';

export default function SpekKegiatanSection() {
  return (
    <article
      id='spek-kegiatan'
      className='prose prose-invert flex min-h-screen flex-col items-center justify-start px-8 py-32 lg:prose-lg xl:prose-xl marker:text-primary prose-h3:mt-0 prose-p:mt-2 prose-ol:mt-0 xs:max-w-[80ch] xs:px-16'
    >
      <h2 className='text-balance w-full text-left text-4xl text-primary drop-shadow-glow'>
        Interaksi Lapangan 2 Intellektuelle Schule 2023
      </h2>
      <p>
        Masing-masing peserta interaksi lapangan 2 Intellektuelle Schule 2023
        diwajibkan untuk mengikuti ketentuan-ketentuan berikut:
      </p>
      <h3 className='w-full text-left text-primary'>Spek Pribadi</h3>
      <ol className='grid w-full gap-x-12 lg:grid-cols-2'>
        <li>
          <span className='font-bold'>Jaket resleting non-ITB</span>
          <p>
            Anggota muda HIMAFI ITB memakai jaket tebal beresleting non-ITB.
          </p>
        </li>

        <li>
          <span className='font-bold'>Ransel</span>
          <p>
            Anggota muda HIMAFI ITB memakai ransel yang dapat memuat seluruh
            spek yang tidak dipakai.
          </p>
        </li>

        <li>
          <span className='font-bold'>Celana panjang olahraga</span>
          <p>
            Anggota muda HIMAFI ITB memakai celana panjang olahraga non-ITB yang
            tidak sobek.
          </p>
        </li>

        <li>
          <span className='font-bold'>Kaos kaki menutup tumit</span>
          <p>Anggota muda HIMAFI ITB memakai kaos kaki yang menutup tumit.</p>
        </li>

        <li>
          <span className='font-bold'>Sepatu bertali dan menutup tumit</span>
          <p>
            Anggota muda HIMAFI ITB memakai sepatu bertali dan menutup tumit.
          </p>
        </li>

        <li>
          <span className='font-bold'>Air minum 1.5 liter</span>
          <p>
            Anggota muda HIMAFI ITB membawa air mineral berukuran 1.5 L yang
            masih disegel.
          </p>
        </li>

        <li>
          <span className='font-bold'>Obat-obatan pribadi (opsional)</span>
          <p>
            Anggota muda HIMAFI ITB membawa obat-obatan pribadi sesuai
            kebutuhan.
          </p>
        </li>

        <li>
          <span className='font-bold'>Madurasa</span>
          <p>Anggota muda HIMAFI ITB membawa madurasa 1 saset.</p>
        </li>

        <li>
          <span className='font-bold'>Tolak angin</span>
          <p>Anggota muda HIMAFI ITB membawa tolak angin 1 saset.</p>
        </li>

        <li>
          <span className='font-bold'>Roti kembung 1 buah</span>
          <p>Anggota muda HIMAFI ITB membawa roti kembung 1 buah.</p>
        </li>

        <li>
          <span className='font-bold'>Ponco</span>
          <p>
            Anggota muda HIMAFI ITB membawa ponco yang bersih, tidak berjamur,
            tidak berjamur, dan dapat digunakan untuk melindungi diri dari
            hujan.
          </p>
        </li>

        <li>
          <span className='font-bold'>Kantong plastik hitam 3 lembar</span>
          <p>
            Anggota muda HIMAFI ITB membawa tiga buah kantong plastik berwarna
            hitam ukuran sedang yang bersih dan dapat digunakan.
          </p>
        </li>

        <li>
          <span className='font-bold'>Cobalt Book</span>
          <p>
            Anggota muda HIMAFI ITB membawa Cobalt Book sesuai dengan syarat dan
            ketentuan yang diberikan.
          </p>
        </li>

        <li>
          <span className='font-bold'>Alat tulis</span>
          <p>
            Anggota muda HIMAFI ITB membawa alat tulis yang digunakan selama
            keberlangsungan IS.
          </p>
        </li>

        <li>
          <span className='font-bold'>Penanda angkatan</span>
          <p>
            Anggota muda HIMAFI ITB membawa penanda angkatan seusai ketentuan.
          </p>
        </li>
      </ol>

      <h3 className='w-full text-left text-primary'>Spek Komunal</h3>
      <ol>
        <li>
          <span className='font-bold'>Dua buah tenda</span>
          <p>
            Anggota muda HIMAFI ITB membawa dua tenda yang memuat minim empat
            orang didalamnya.
          </p>
        </li>

        <li>
          <span className='font-bold'>Bendera angkatan</span>
          <p>Anggota muda HIMAFI ITB membawa bendera angkatan 22.</p>
        </li>
      </ol>

      <h3 className='w-full text-left text-primary'>Tambahan</h3>
      <ol>
        <li>
          Peserta diwajibkan datang dalam kondisi siap: perut terisi, sudah
          sholat.
        </li>

        <li>Peserta diwajibkan tugas-tugas dengan tenggat tanggal 30.</li>

        <li>
          Peserta diwajibkan melakukan pendataan mobilisasi baik keberangkatan
          dan kepulangan (dianjurkan menginap jika rumah/kos berjarak diatas
          8km).
        </li>

        <li>
          Peserta diwajibkan hadir dan pulang secara komunal, tidak ada keluarga
          yang tertinggal.
        </li>
      </ol>

      <div className='w-full pt-12 text-center'>
        <p className='italic'>
          Teman adalah saudara, saudara adalah keluarga, kebersamaan adalah
          segalanya
        </p>
      </div>
    </article>
  );
}
