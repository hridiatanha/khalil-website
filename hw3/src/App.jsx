import { useEffect, useMemo, useState } from "react";
import { fetchMenu } from "./api/menu";

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMenu();
        setMenuItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Menu fetch failed:", e);
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const menuSections = useMemo(() => {
    const map = new Map();
    for (const item of menuItems) {
      const section = item.section || "Other";
      if (!map.has(section)) map.set(section, []);
      map.get(section).push(item);
    }
    return Array.from(map.entries()).map(([title, items]) => ({
      title,
      items: items.sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }, [menuItems]);

  return (
    <div className="min-h-screen">
      {/* replace this with your existing Header/Hero/etc */}
      <section id="menu" className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Menu</h2>

        {loading ? (
          <p className="text-center">Loading menu...</p>
        ) : menuSections.length === 0 ? (
          <p className="text-center">
            No menu items found. Seed MongoDB and try again.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {menuSections.map((sec) => (
              <div key={sec.title} className="bg-white rounded-xl p-5 shadow">
                <h3 className="text-xl font-bold mb-4">{sec.title}</h3>
                <ul className="space-y-3">
                  {sec.items.map((item) => (
                    <li
                      key={item._id || item.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <span>{item.name}</span>
                      <span className="font-bold">${Number(item.price).toFixed(2)}</span>
                      <button className="px-3 py-1 rounded bg-red-800 text-white">
                        Add
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
