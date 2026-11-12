import { Reveal } from '../../shared/Reveal';
import { CheckIcon } from '../../ui/icons';

const FIELDS = [
  { label: 'Account number', width: 'w-[78%]' },
  { label: 'Bank', width: 'w-[52%]' },
  { label: 'Amount', width: 'w-[40%]', amount: true },
];

const STEPS = [
  'Snap the details',
  'Review what was captured',
  'Continue to pay',
];

/**
 * An editorial capture scene. The slip, boxes and review card are an illustration of the flow,
 * drawn with bars instead of text so they never show real account details.
 */
export function SnapSection() {
  return (
    <section
      id="snap"
      aria-labelledby="snap-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-stride-deep text-white"
    >
      <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-stride-sky">Snap to pay</p>
            <h2 id="snap-heading" className="display-md mt-3">
              Photograph it. Don&apos;t type it.
            </h2>
            <p className="mt-4 max-w-md text-white/85">
              Someone wrote their account details and an amount on paper, or
              sent them as a picture? Take a photo, and Cheetah lays the details
              out for you to check, so there&apos;s less to key in by hand.
            </p>
          </Reveal>
          <ol className="mt-8 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {STEPS.map((step, index) => (
              <Reveal
                as="li"
                key={step}
                delay={0.06 + index * 0.08}
                y={14}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 xl:flex-col xl:items-start"
              >
                <span className="tabular font-display text-sm font-bold text-stride-sky">
                  0{index + 1}
                </span>
                <span className="font-display font-bold leading-tight">
                  {step}
                </span>
              </Reveal>
            ))}
          </ol>
          <p className="mt-5 text-sm text-white/90">
            Always check the details before you confirm. Nothing is paid until
            you do.
          </p>
        </div>

        <div className="relative lg:col-span-7" aria-hidden>
          <div className="grid items-center gap-6 sm:grid-cols-[1.25fr_1fr] sm:gap-0">
            <Reveal
              y={40}
              className="relative z-10 rounded-4xl bg-stride-night p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] sm:p-7"
            >
              <div className="relative rotate-[-4deg] rounded-lg bg-[#fbf6e8] p-6 text-stride-night shadow-xl">
                {FIELDS.map((field, index) => (
                  <div key={field.label} className={index ? 'mt-5' : ''}>
                    <span className="block h-1.5 w-1/4 rounded-full bg-stride-night/25" />
                    <span className="relative mt-2 flex items-center gap-2">
                      {field.amount && (
                        <span className="font-display text-lg leading-none font-bold">
                          ₦
                        </span>
                      )}
                      <span
                        className={`block h-3 rounded-full ${field.amount ? 'bg-sun' : 'bg-stride-night/75'} ${field.width}`}
                      />
                      <span className="absolute -inset-x-2 -inset-y-2 rounded-md border-2 border-dashed border-stride-deep" />
                      <span className="absolute -top-6 right-0 rounded-full bg-stride-deep px-2 py-0.5 text-[0.62rem] font-bold text-white">
                        {field.label}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-3 size-[calc(100%-1.5rem)]"
                fill="none"
                stroke="var(--color-sun)"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path
                  d="M1 14V1h13M86 1h13v13M99 86v13H86M14 99H1V86"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className="pointer-events-none absolute inset-0 animate-flash rounded-4xl bg-white" />
              <span className="absolute -bottom-5 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-white ring-[6px] ring-stride-deep">
                <span className="size-6 rounded-full bg-stride-night" />
              </span>
            </Reveal>

            <Reveal
              delay={0.18}
              y={40}
              className="relative mx-auto w-full sm:-ml-6 sm:w-auto sm:rotate-3"
            >
              <svg
                viewBox="0 0 60 20"
                className="absolute top-1/2 -left-14 hidden w-16 -translate-y-1/2 sm:block"
                fill="none"
              >
                <path
                  d="M2 10h52M48 4l6 6-6 6"
                  stroke="var(--color-sun)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="rounded-[1.75rem] bg-white p-5 text-stride-night shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]">
                <p className="font-display text-sm font-bold">Review payment</p>
                <ul className="mt-4 grid gap-3">
                  {FIELDS.map((field) => (
                    <li
                      key={field.label}
                      className="flex items-center justify-between gap-3 border-b border-stride-night/10 pb-3"
                    >
                      <span>
                        <span className="block text-[0.68rem] text-stride-night/65">
                          {field.label}
                        </span>
                        <span
                          className={`mt-1 block h-2 rounded-full ${field.amount ? 'w-16 bg-sun' : 'w-24 bg-stride-night/70'}`}
                        />
                      </span>
                      <span className="grid size-6 place-items-center rounded-full bg-flex-mist text-flex-ink">
                        <CheckIcon className="size-3.5" />
                      </span>
                    </li>
                  ))}
                </ul>
                <span className="mt-4 block rounded-full bg-stride-night py-2.5 text-center font-display text-sm font-bold text-white">
                  Continue
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
