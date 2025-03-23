import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../supabase/client";
import toast, { Toaster } from "react-hot-toast"; // Importamos react-hot-toast

// Esquema de validación con los nombres de Supabase
const complaintSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Debe ser un correo válido"),
    dni: z.string().min(8, "El DNI debe tener al menos 8 caracteres"),
    phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
    claim_or_complaint: z.string().min(1, "Debe seleccionar Reclamo o Queja"),
    affair: z.string().min(1, "El asunto es requerido"),
    details: z.string().min(10, "Debe describir el problema con al menos 10 caracteres"),
    privacyPolicy: z.literal(true, {
        errorMap: () => ({ message: "Debes aceptar las Políticas y privacidad" })
    })
});

// Definir el tipo basado en el esquema
type ComplaintFormData = z.infer<typeof complaintSchema>;

export const ComplaintsBook = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ComplaintFormData>({
        resolver: zodResolver(complaintSchema),
    });

    const onSubmit = async (data: ComplaintFormData) => {
        console.log("Datos enviados:", data);

        try {
            // Insertar datos en Supabase
            const { error } = await supabase.from("complaints_book").insert([
                {
                    name: data.name,
                    email: data.email,
                    dni: Number(data.dni),
                    phone: Number(data.phone),
                    claim_or_complaint: data.claim_or_complaint,
                    affair: data.affair,
                    details: data.details
                }
            ]);

            if (error) {
                console.error("Error al enviar el formulario:", error.message);
                toast.error("Hubo un error al enviar el formulario."); // Notificación de error
            } else {
                toast.success("Formulario enviado correctamente"); // Notificación de éxito
                reset(); // Limpiamos el formulario después de enviarlo
            }
        } catch (err) {
            console.error("Error inesperado:", err);
            toast.error("Hubo un error inesperado al enviar el formulario."); // Notificación de error inesperado
        }
    };

    return (
        <div className="flex justify-center items-center min-h-full">
            {/* Toaster para mostrar las notificaciones */}
            <Toaster position="top-center" reverseOrder={false} />

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-screen-xl bg-[#323232] p-8 rounded-lg shadow-lg">
                <h1 className="text-center mb-7 font-extrabold text-3xl">Libro de Reclamaciones</h1>

                <h1 className="text-left mb-7  font-medium">1. Datos del Cliente</h1>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                            Nombre Completo
                        </label>
                        <input
                            {...register("name")}
                            className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            placeholder="ejm: Jhon Braulio Sanchez Inga*"
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                            E-mail
                        </label>
                        <input
                            {...register("email")}
                            className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            placeholder="ejm: Jhon12@hotmail.com*"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                            Documento de Identidad (DNI)
                        </label>
                        <input
                            {...register("dni")}
                            className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            placeholder="ejm: 0434834721*"
                        />
                        {errors.dni && <p className="text-red-500 text-xs italic">{errors.dni.message}</p>}
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                            Teléfono
                        </label>
                        <input
                            {...register("phone")}
                            className="appearance-none block w-full bg-gray-200 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            placeholder="ejm: 940475937*"
                        />
                        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
                    </div>
                </div>

                <h1 className="text-left mb-7 font-medium">2. Reclamación y pedido del cliente</h1>

                <div className="w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                        Reclamo / Queja
                    </label>
                    <input
                        {...register("claim_or_complaint")}
                        className="appearance-none block w-full bg-gray-200 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        placeholder="ejm: Reclamo / Queja*"
                    />
                    {errors.claim_or_complaint && <p className="text-red-500 text-xs italic">{errors.claim_or_complaint.message}</p>}
                </div>

                <div className="w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                        Asunto
                    </label>
                    <input
                        {...register("affair")}
                        className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        placeholder="ejm: No me llegó las monedas*"
                    />
                    {errors.affair && <p className="text-red-500 text-xs italic">{errors.affair.message}</p>}
                </div>

                <div className="w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                        Detalles del problema
                    </label>
                    <textarea
                        {...register("details")}
                        className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white h-48 resize-none"
                    ></textarea>
                    {errors.details && <p className="text-red-500 text-xs italic">{errors.details.message}</p>}
                </div>

                {/* Campo de política de privacidad */}
                <div className="w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                        <input
                            type="checkbox"
                            {...register("privacyPolicy")}
                            className="mr-2 leading-tight"
                        />
                        Acepto las Políticas y privacidad
                    </label>
                    {errors.privacyPolicy && <p className="text-red-500 text-xs italic">{errors.privacyPolicy.message}</p>}
                </div>

                <button
                    type="submit"
                    className="shadow bg-[#70F468] hover:bg-[#5BD054] text-black font-semibold py-2 px-4 rounded"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default ComplaintsBook;