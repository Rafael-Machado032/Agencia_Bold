"use client"
import { DeletarDepoimento, EditarDepoimento, SalvarDepoimento } from "@/api/DepoimentoAPI"
import { useDepoimento } from "@/contexts/DepoimentoContext"
import NextImage from "next/image"
import { useRef, useState } from "react"

export default function Depoimentos() {
    const formRef = useRef<HTMLFormElement>(null);
    const { depoimentoDados, setDepoimentoDados } = useDepoimento();
    const [previewDepoimento, setPreviewDepoimento] = useState<string | null>(null);

    // ESTADO PARA EDIÇÃO
    const [idEditando, setIdEditando] = useState<number | null>(null);

    const pegarCaminhoFotoDepoimento = (e: React.ChangeEvent<HTMLInputElement>) => {
        const arquivo = e.target.files?.[0];
        if (arquivo) {
            const urlTemporaria = URL.createObjectURL(arquivo);
            setPreviewDepoimento(urlTemporaria);
        }
    };

    // FUNÇÃO DELETAR
    const handleDeletar = async (id: number) => {
        if (confirm("Tem certeza que deseja excluir este depoimento?")) {
            const sucesso = await DeletarDepoimento(id);
            if (sucesso) {
                setDepoimentoDados(depoimentoDados.filter(d => d.id !== id));
            } else {
                alert("Erro ao deletar.");
            }
        }
    };

    // FUNÇÃO PARA PREPARAR EDIÇÃO (Coloca os dados de volta no form)
    const prepararEdicao = (item: typeof depoimentoDados[0]) => {
        setIdEditando(item.id);
        // Forçamos o preview a ser string ou null para o estado não reclamar
        setPreviewDepoimento(item.foto_depoimento ?? null);
        if (formRef.current) {
            // Usamos o operador de interrogação caso algum campo venha nulo do banco
            formRef.current.nome.value = item.nome ?? "";
            formRef.current.depoimento.value = item.mensagem ?? "";
        }
    };


    const cancelarEdicao = () => {
        setIdEditando(null);
        setPreviewDepoimento(null);
        formRef.current?.reset();
    };

    const salvarDepoimento = async (formData: FormData) => {
        const nomeInput = formData.get("nome") as string;
        const mensagemInput = formData.get("depoimento") as string;

        if (!nomeInput || !mensagemInput) return alert("Preencha os campos.");

        if (idEditando) {
            // LÓGICA DE ATUALIZAR
            const resultado = await EditarDepoimento(idEditando, formData);
            if (resultado?.success) {
                setDepoimentoDados(depoimentoDados.map(d => d.id === idEditando ? resultado.dados : d));
                alert("Atualizado!");
                cancelarEdicao();
            }
        } else {
            // LÓGICA DE CRIAR NOVO
            const resultado = await SalvarDepoimento(formData);
            if (resultado?.success) {
                setDepoimentoDados([...depoimentoDados, resultado.dados]);
                formRef.current?.reset();
                setPreviewDepoimento(null);
                alert("Salvo!");
            }
        }
    };

    return (
        <section className='flex flex-col max-h-128 sm:flex-row gap-6 px-4 mt-28'>
            <div className='sm:w-1/2 pr-6 border-r'>
                <h2 className='text-xl font-bold text-center mb-4'>
                    {idEditando ? "Editando Depoimento" : "Cadastro de Depoimento"}
                </h2>
                <form action={salvarDepoimento} ref={formRef} className='flex flex-col gap-4 '>
                    <div className='flex flex-col justify-center items-center '>
                        <div className="relative w-24 h-24 mb-2 overflow-hidden rounded-full border bg-gray-100 flex items-center justify-center">
                            {previewDepoimento ?
                                <NextImage src={previewDepoimento} alt="Preview" className='object-cover' unoptimized fill priority /> :
                                <span className="text-gray-400">Sem foto</span>
                            }
                        </div>
                        <input type="file" name="foto-usuario" id="foto-usuario" className='hidden' onChange={pegarCaminhoFotoDepoimento} />
                        <label htmlFor="foto-usuario" className='text-sm text-blue-600 cursor-pointer hover:underline'>Alterar Foto</label>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className="font-semibold">Nome:</label>
                        <input type="text" name="nome" className='p-2 border rounded' required />

                        <label className="font-semibold">Depoimento:</label>
                        <textarea name="depoimento" className='h-24 p-2 border rounded resize-none' required />
                    </div>

                    <div className="flex gap-2">
                        <button className='flex-1 bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition'>
                            {idEditando ? "Salvar Alterações" : "Enviar Depoimento"}
                        </button>
                        {idEditando && (
                            <button type="button" onClick={cancelarEdicao} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className='sm:w-1/2'>
                <h2 className='text-center text-xl font-bold mb-4'>Gerenciar Depoimentos</h2>
                <div className='h-105 border overflow-y-auto flex flex-col gap-3 p-2 bg-gray-50 rounded shadow-inner'>
                    {depoimentoDados.map((item) => (
                        <div key={item.id} className='p-3 flex items-center border rounded-lg bg-white hover:shadow-md transition'>
                            <div className="relative w-12 h-12 mr-3 shrink-0 overflow-hidden rounded-full border">
                                <NextImage src={item.foto_depoimento} alt={item.nome} className='object-cover' unoptimized fill priority />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sm truncate">{item.nome}</h3>
                                <p className="text-xs text-gray-500 line-clamp-1 italic">{item.mensagem}</p>
                            </div>
                            <div className='flex gap-1'>
                                <button onClick={() => prepararEdicao(item)} className="p-2 hover:bg-blue-50 rounded text-blue-600" title="Editar">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                </button>
                                <button onClick={() => handleDeletar(item.id)} className="p-2 hover:bg-red-50 rounded text-red-600" title="Excluir">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
