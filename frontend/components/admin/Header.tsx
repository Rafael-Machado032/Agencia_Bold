import NextImage from 'next/image';
import { useUsuario } from '@/contexts/UsuarioContext';

export function Header() {
    const { usuarioDados } = useUsuario(); // Pega os dados do usuário logado no contexto
    
    // console.log('Nome do usuário:', usuarioDados?.name);
    // console.log('URL da foto do usuário:', usuarioDados?.foto_perfil);
    return (
        <header className="absolute -z-10 w-full bg-blue-200 p-5.5">
            <div className='flex justify-end w-full '>
                <div className='flex items-center gap-4 group cursor-pointer'>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800 leading-none capitalize">
                            {usuarioDados?.name || 'Carregando...'} {/* Exibe o nome do usuário ou "Carregando..." se não tiver */}
                        </p>
                        <span className="text-xs text-green-500 font-medium">Online</span>
                    </div>

                    <div className="relative w-16 h-16 ring-2 ring-blue-50 ring-offset-2 rounded-full overflow-hidden transition-transform group-hover:scale-105 shadow-inner bg-gray-100">
                        {usuarioDados?.foto_perfil ? (
                            <NextImage
                                src={usuarioDados.foto_perfil}
                                alt="Foto do Perfil"
                                fill
                                unoptimized
                                className='object-cover'
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                                {usuarioDados?.name ? usuarioDados.name.charAt(0).toUpperCase() : '...'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
