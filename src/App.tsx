import React, { useState } from 'react';
import { Car, Phone, Settings, Plus, Trash2, MapPin } from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  price: string;
  image: string;
}

const initialCars: Vehicle[] = [
  { id: 1, name: 'Renault Clio', price: '800 TL/Gün', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Fiat Egea', price: '950 TL/Gün', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80' },
];

export default function App() {
  const [cars, setCars] = useState<Vehicle[]>(initialCars);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newCar, setNewCar] = useState({ name: '', price: '', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80' });

  const addCar = () => {
    if (newCar.name && newCar.price) {
      setCars([...cars, { ...newCar, id: Date.now() }]);
      setNewCar({ name: '', price: '', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-900"><Car className="text-blue-600" /> Innoqa</h1>
          <button onClick={() => setIsAdmin(!isAdmin)} className="p-2 hover:bg-gray-100 rounded-full transition">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        {isAdmin && (
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Yönetim Paneli: Araç Ekle</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input placeholder="Araç Adı" className="border p-2 rounded-lg" value={newCar.name} onChange={e => setNewCar({...newCar, name: e.target.value})} />
              <input placeholder="Fiyat (Örn: 900 TL/Gün)" className="border p-2 rounded-lg" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} />
              <button onClick={addCar} className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"><Plus size={18}/> Ekle</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map(car => (
            <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={car.image} alt={car.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{car.name}</h3>
                <p className="text-blue-600 font-bold text-lg mb-6">{car.price}</p>
                <a href="https://wa.me/905550000000" target="_blank" rel="noreferrer" className="block w-full text-center bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
                  WhatsApp ile İletişime Geç
                </a>
                {isAdmin && <button onClick={() => setCars(cars.filter(c => c.id !== car.id))} className="mt-4 text-red-500 flex items-center gap-1 text-sm"><Trash2 size={16}/> Sil</button>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}