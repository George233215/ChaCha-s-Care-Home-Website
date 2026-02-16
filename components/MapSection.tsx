import React from 'react'

type Props = {
  destination?: string
  placeName?: string
  lat?: number
  lng?: number
  zoom?: number
}

export function MapSection({
  destination = 'Mechanicsville, VA 23111',
  placeName = "Cha Cha's Care Home",
  lat,
  lng,
  zoom = 15,
}: Props) {
  const query = destination
  const mapSrc = lat && lng
    ? `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`

  const directionsHref = lat && lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`

  return (
    <section className="py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Find Us</h3>
              <p className="text-sm text-muted-foreground">{placeName} - {destination}</p>
            </div>

            <div className="flex-shrink-0 w-full sm:w-56 h-36 rounded-md overflow-hidden border">
              <iframe
                title="Location preview"
                src={mapSrc}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 w-full h-full"
                aria-hidden={false}
              />
            </div>
          </div>

          <div className="p-4 bg-background flex items-center justify-end gap-2">
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md shadow-sm hover:opacity-95 transition"
            >
              Get directions
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-border rounded-md text-foreground bg-white hover:bg-gray-50 transition"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection

