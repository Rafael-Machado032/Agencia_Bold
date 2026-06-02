import NextImage from 'next/image';

export default function Empresas() {
    return (
        <section className='flex justify-between items-center mx-auto w-full max-w-6xl flex-col md:flex-row'>
            <div className='relative w-80 h-40'>
                <NextImage src="/images/LOGO1.png" alt="Logo1.png" fill priority unoptimized />
            </div>
            <div className='relative w-80 h-40'>
                <NextImage src="/images/LOGO2.png" alt="Logo2.png" fill priority unoptimized />
            </div>
            <div className='relative w-80 h-40'>
                <NextImage src="/images/LOGO3.png" alt="Logo3.png" fill priority unoptimized />
            </div>
            <div className='relative w-80 h-40'>
                <NextImage src="/images/LOGO4.png" alt="Logo4.png" fill priority unoptimized />
            </div>
            <div className='relative w-80 h-40'>
                <NextImage src="/images/LOGO5.png" alt="Logo5.png" fill priority unoptimized />
            </div>
        </section>
    )
}
