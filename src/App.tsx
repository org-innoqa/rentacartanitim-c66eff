import React, { useState } from 'react';
import { Car, Phone, Settings, Plus, Trash2 } from 'lucide-react';

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
  const [newCar, setNewCar] = useState({ name: '', price: '', image: '' });

  const addCar = () => {
    if (newCar.name && newCar.price) {
      setCars([...cars, { ...newCar, id: Date.now() }]);
      setNewCar({ name: '', price: '', image: '' });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Car /> RentACar</h1>
        <button onClick={() => setIsAdmin(!isAdmin)} className="p-2 bg-gray-200 rounded-full">
          <Settings size={20} />
        </button>
      </header>

      {isAdmin && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border">
          <h2 className="text-lg font-semibold mb-4">Admin Paneli: Araç Ekle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="Araç Adı" className="border p-2 rounded" value={newCar.name} onChange={e => setNewCar({...newCar, name: e.target.value})} />
            <input placeholder="Fiyat" className="border p-2 rounded" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} />
            <button onClick={addCar} className="bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2"><Plus size={18}/> Ekle</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cars.map(car => (
          <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{car.name}</h3>
              <p className="text-blue-600 font-semibold mb-4">{car.price}</p>
              <a href="https://wa.me/905550000000" target="_blank" className="block w-full text-center bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition">
                WhatsApp ile Kirala
              </a>
              {isAdmin && <button onClick={() => setCars(cars.filter(c => c.id !== car.id))} className="mt-4 text-red-500 flex items-center gap-1"><Trash2 size={16}/> Sil</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}