import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaUserPlus } from 'react-icons/fa';
import { autoPurchaseSchema, AutoPurchaseFormValues } from '@/lib/validators';

interface AutoPurchaseFormProps {
  defaultValues?: Partial<AutoPurchaseFormValues>;
  onSubmit: (data: AutoPurchaseFormValues) => void;
  submitLabel?: string;
  showCancel?: boolean;
  onCancel?: () => void;
}

const inputClass =
  'w-full rounded-lg border border-zinc-600 bg-[#1E1E1E] p-3 text-white placeholder-zinc-500 transition focus:border-[#00FF87] focus:outline-none focus:ring-2 focus:ring-[#00FF87]/30';

const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-300';

export const AutoPurchaseForm = ({
  defaultValues,
  onSubmit,
  submitLabel = 'Continuar al pago',
  showCancel = false,
  onCancel,
}: AutoPurchaseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AutoPurchaseFormValues>({
    resolver: zodResolver(autoPurchaseSchema),
    defaultValues: {
      clientName: '',
      eaEmail: '',
      eaPassword: '',
      backupCode1: '',
      backupCode2: '',
      backupCode3: '',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="rounded-xl border border-zinc-700 bg-[#121212]/90 p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20">
            <FaUserPlus className="text-orange-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Datos del Nuevo Cliente</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>
              Nombre del Cliente <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Tiocoins"
              className={inputClass}
              {...register('clientName')}
            />
            {errors.clientName && (
              <p className="mt-1 text-xs text-red-400">{errors.clientName.message}</p>
            )}
            <p className="mt-1.5 text-xs text-zinc-500">
              Formato: <strong className="text-zinc-400">NombreCliente TuUsuario</strong> — Ej: Jose Perez Tiocoins
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Email EA <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              placeholder="cliente@email.com"
              className={inputClass}
              {...register('eaEmail')}
            />
            {errors.eaEmail && (
              <p className="mt-1 text-xs text-red-400">{errors.eaEmail.message}</p>
            )}

            <div className="mt-2 flex gap-2 rounded-lg border border-orange-500/50 bg-orange-950/30 p-3">
              <span className="text-base leading-none text-orange-400">⚠️</span>
              <p className="text-xs leading-relaxed text-orange-200/90">
                Asegúrate de que este sea tu correo de{' '}
                <strong className="text-orange-300">EA (ea.com)</strong>, NO tu
                correo personal, ni de Xbox o PSN.
              </p>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Contraseña EA <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              className={inputClass}
              {...register('eaPassword')}
            />
            {errors.eaPassword && (
              <p className="mt-1 text-xs text-red-400">{errors.eaPassword.message}</p>
            )}
          </div>

          <details className="group rounded-lg border border-amber-500/40 bg-amber-950/40 p-4">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-amber-300">
              <span>🔑</span>
              <span className="underline decoration-amber-400/60 underline-offset-2">
                ¿Cómo obtener tus códigos de respaldo de EA?
              </span>
              <span className="ml-auto text-amber-400 transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>

            <div className="mt-3 space-y-3 text-xs leading-relaxed text-amber-100/90">
              <ol className="list-decimal space-y-1.5 pl-5 marker:text-amber-400">
                <li>
                  Ingresa a tu cuenta EA aquí:{' '}
                  <a
                    href="https://myaccount.ea.com/cp-ui/security/index"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-amber-300 underline underline-offset-2 hover:text-amber-200"
                  >
                    https://myaccount.ea.com/cp-ui/security/index
                  </a>
                </li>
                <li>
                  En <strong className="text-amber-200">Autenticación en dos pasos</strong>, presiona la flecha (›) que aparece a la derecha.
                </li>
                <li>
                  Ingresa el código que EA te enviará por correo o a tu dispositivo de autenticación.
                </li>
                <li>
                  Haz clic en <strong className="text-amber-200">Ver códigos de seguridad o respaldo</strong>.
                </li>
                <li>
                  Copia los 3 primeros códigos disponibles, cada código en cada recuadro.
                </li>
              </ol>

              <p className="rounded-md bg-amber-900/40 p-2 text-amber-200">
                ⚠️ Si no ves "Ver códigos de seguridad", primero completa la verificación de seguridad.
              </p>

              <a
                href="/paso-a-paso#codigos-ea"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-amber-300 underline underline-offset-2 hover:text-amber-200"
              >
                ▶ Ver video tutorial
              </a>
            </div>
          </details>

          <div>
            <label className={labelClass}>
              Backup Code Principal <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Código de respaldo"
              className={inputClass}
              {...register('backupCode1')}
            />
            {errors.backupCode1 && (
              <p className="mt-1 text-xs text-red-400">{errors.backupCode1.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Backup Code 2</label>
              <input
                type="text"
                placeholder="Opcional"
                className={inputClass}
                {...register('backupCode2')}
              />
            </div>
            <div>
              <label className={labelClass}>Backup Code 3</label>
              <input
                type="text"
                placeholder="Opcional"
                className={inputClass}
                {...register('backupCode3')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`flex gap-3 ${showCancel ? 'flex-col sm:flex-row' : ''}`}>
        {showCancel && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-zinc-600 py-3 font-semibold text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="flex-1 rounded-xl bg-gradient-to-r from-[#00FF87] to-emerald-600 py-3 font-bold text-black shadow-lg transition hover:from-[#00e676] hover:to-emerald-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
