const stats = [
  { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
  { id: 2, name: 'Assets under holding', value: '$119 trillion' },
  { id: 3, name: 'New users annually', value: '46,000' },
];

export const Testimonion = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 sm:py-20 mb-16 mt-16"> {/* Agregué mb-12 para margen inferior */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-12 text-center lg:grid-cols-3"> {/* Ajusté gap-y-12 para espaciado vertical */}
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl" 
            >
              <dt className="text-lg font-medium text-white">{stat.name}</dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};