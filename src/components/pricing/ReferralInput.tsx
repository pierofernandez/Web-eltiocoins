interface ReferralInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ReferralInput = ({ value, onChange }: ReferralInputProps) => (
  <div className="space-y-2">
    <label htmlFor="referral-code" className="text-xs font-medium text-zinc-400">
      Código de referido (opcional)
    </label>
    <input
      id="referral-code"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Ej: AMIGO2024"
      className="w-full rounded-xl border border-zinc-600 bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-zinc-600 transition focus:border-[#00FF87] focus:outline-none focus:ring-1 focus:ring-[#00FF87]/30"
    />
  </div>
);
