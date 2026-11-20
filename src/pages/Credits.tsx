import { Link } from 'react-router-dom'
import { PHOTOS } from '../data/photos'
import { getProduct } from '../data/products'

export default function Credits() {
  return (
    <div className="container-x max-w-4xl py-12">
      <h1 className="h-section">קרדיטים לתמונות</h1>
      <p className="mt-4 max-w-[60ch] text-ink-2">
        תמונות המוצרים באתר הקונספט צולמו על ידי צלמים שפרסמו אותן ב-Wikimedia Commons ברישיונות חופשיים. מוצרים בלי צילום מוצגים באיור.
      </p>
      <table className="mt-8 w-full text-right text-sm">
        <thead className="border-b border-line-strong text-mute">
          <tr>
            <th className="py-2 font-medium">מוצר</th>
            <th className="py-2 font-medium">צלם</th>
            <th className="py-2 font-medium">רישיון</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {Object.entries(PHOTOS).map(([id, c]) => (
            <tr key={id}>
              <td className="py-2.5 pl-4">
                <Link to={`/product/${id}`} className="font-medium hover:underline">
                  {getProduct(id)?.name}
                </Link>
              </td>
              <td className="py-2.5 pl-4">
                <a href={c.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                  {c.author}
                </a>
              </td>
              <td className="py-2.5" dir="ltr">
                {c.license}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
