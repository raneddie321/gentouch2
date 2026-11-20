import { Link } from 'react-router-dom'
import { Invader } from '../components/Logo'

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <Invader className="mx-auto w-24 animate-float" />
        <h1 className="mt-6 font-display text-6xl font-black">404</h1>
        <p className="mt-2 text-lg text-mist-300">GAME OVER — העמוד הזה לא נמצא</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="btn-primary">
            Continue? חזרה לבית
          </Link>
          <Link to="/catalog" className="btn-ghost">
            לקטלוג
          </Link>
        </div>
      </div>
    </div>
  )
}
