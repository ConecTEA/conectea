import type { Box } from '../data/boxes'
import type { Tutorial } from '../data/tutoriais'
import { CapaBox } from './CapaBox'

function IconPlay({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" className="fill-current" />
    </svg>
  )
}

// Player: usa o arquivo de vídeo quando existe; senão mostra o aviso "Vídeo em produção".
export function VideoTutorial({ tutorial, box }: { tutorial: Tutorial; box: Box }) {
  if (tutorial.videoUrl) {
    return (
      <video
        controls
        preload="metadata"
        className="aspect-video w-full rounded-card bg-ink"
        aria-label={`Vídeo: ${tutorial.titulo}`}
      >
        <source src={tutorial.videoUrl} />
        Seu navegador não consegue mostrar este vídeo.
      </video>
    )
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card bg-ink">
      <CapaBox box={box} className="absolute inset-0 h-full w-full rounded-none opacity-90" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/45 px-4 text-center text-white">
        <span className="flex h-20 w-20 animate-pulso items-center justify-center rounded-full bg-white text-violet-deep">
          <IconPlay className="ml-1 h-9 w-9" />
        </span>
        <p className="font-display text-xl font-bold">Vídeo em produção</p>
        <p className="max-w-md text-sm text-white/90">Enquanto isso, siga o passo a passo ao lado.</p>
      </div>
      <span className="absolute bottom-3 right-3 rounded-full bg-ink px-3 py-1 text-sm font-semibold text-white">
        {tutorial.duracao}
      </span>
    </div>
  )
}

export { IconPlay }
