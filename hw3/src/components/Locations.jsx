export default function Locations() {
  return (
    <section id="locations" className="py-12 px-5">
      <h2 className="text-center text-3xl font-extrabold text-[#7a1414] mb-7">
        Our Locations
      </h2>

      <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-lg shadow-black/5">
          <h3 className="font-extrabold text-lg mb-3">Parkchester</h3>
          <iframe
            className="w-full h-[300px] rounded-xl border-0"
            src="https://www.google.com/maps?q=2104+Starling+Ave,+Bronx,+NY+10462&output=embed"
            loading="lazy"
            allowFullScreen
            title="Parkchester Map"
          />
          <p className="mt-3">
            📍{" "}
            <a
              className="text-[#7a1414] font-extrabold hover:underline"
              target="_blank"
              rel="noreferrer"
              href="https://goo.gl/maps/SH4sChULe5iAfe3Q8"
            >
              2104 Starling Ave, Bronx, NY 10462
            </a>
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg shadow-black/5">
          <h3 className="font-extrabold text-lg mb-3">Jackson Heights</h3>
          <iframe
            className="w-full h-[300px] rounded-xl border-0"
            src="https://www.google.com/maps?q=37-14+73rd+St,+Jackson+Heights,+NY+11372&output=embed"
            loading="lazy"
            allowFullScreen
            title="Jackson Heights Map"
          />
          <p className="mt-3">
            📍{" "}
            <a
              className="text-[#7a1414] font-extrabold hover:underline"
              target="_blank"
              rel="noreferrer"
              href="https://goo.gl/maps/jKHez4Yb8X72"
            >
              37-14 73rd St, Jackson Heights, NY 11372
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
