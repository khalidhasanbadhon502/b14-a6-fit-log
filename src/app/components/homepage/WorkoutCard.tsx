import Link from "next/link";
import workoutsData from './WorkoutCard.json';

export default function WorkoutSection() {
  return (
    <section className="w-full bg-[#111111] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutsData.map((workout) => (
            <Link
              href={`/workout/${workout.id}`}
              key={workout.id}
              className="bg-[#18181b] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between transition hover:border-zinc-700"
            >
              <div className="relative w-full h-56 bg-zinc-900">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {workout.muscleGroups.map((muscle, idx) => (
                      <span
                        key={idx}
                        className="bg-[#b6fd00] text-black text-xs font-bold px-2.5 py-1 rounded-md uppercase"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-white font-extrabold text-lg tracking-wide uppercase mb-1">
                    {workout.name}
                  </h3>

                  <p className="text-zinc-400 text-xs mb-6">
                    {workout.equipment}
                  </p>
                </div>

                <div className="flex items-center justify-start gap-6 text-xs md:text-sm text-zinc-400 pt-4 border-t border-zinc-800/80">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                    </svg>
                    <span>{workout.duration} min</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>{workout.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}