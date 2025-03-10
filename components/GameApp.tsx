"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const cities = [
    { name: "Yapkashnagar", distance: 60 },
    { name: "Lihaspur", distance: 50 },
    { name: "Narmis City", distance: 40 },
    { name: "Shekharvati", distance: 30 },
    { name: "Nuravgram", distance: 20 },
];

const vehicles = [
    { name: "EV Bike", range: 60, count: 2 },
    { name: "EV Car", range: 100, count: 1 },
    { name: "EV SUV", range: 120, count: 1 },
];

function GameApp() {
    const [selections, setSelections] = useState([
        { cop: "Cop 1", city: "", vehicle: "" },
        { cop: "Cop 2", city: "", vehicle: "" },
        { cop: "Cop 3", city: "", vehicle: "" },
    ]);
    const [fugitiveCity, setFugitiveCity] = useState("");
    const [showResult, setShowResult] = useState(false);
    const router = useRouter();

    type SelectionField = "city" | "vehicle";

    interface HandleSelectProps {
        index: number;
        field: SelectionField;
        value: string;
    }

    const handleSelect = (index: number, field: SelectionField, value: string) => {
        const newSelections = [...selections];
        newSelections[index][field] = value;
        setSelections(newSelections);
    };
    const startGame = () => {
        const randomCity = cities[Math.floor(Math.random() * cities.length)].name;
        setFugitiveCity(randomCity);
        setShowResult(true);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-light text-gray-600  mb-6">Fugitive Hunt</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                {selections.map((cop, index) => (
                    <div key={index} className="mb-4 border-b pb-4">
                        <h3 className="text-lg font-semibold text-black">{cop.cop}</h3>
                        <label className="block text-black mt-2">City:</label>
                        <select
                            className="w-full p-2 border rounded-md text-black"
                            onChange={(e) => handleSelect(index, "city", e.target.value)}
                        >
                            <option value="">Select City</option>
                            {cities.map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name} ({c.distance} KM)
                                </option>
                            ))}
                        </select>
                        <label className="block text-black mt-2">Vehicle:</label>
                        <select
                            className="w-full p-2 border rounded-md text-black"
                            onChange={(e) => handleSelect(index, "vehicle", e.target.value)}
                        >
                            <option value="">Select Vehicle</option>
                            {vehicles.map((v) => (
                                <option key={v.name} value={v.name}>
                                    {v.name} (Range: {v.range} KM)
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <button
                    onClick={startGame}
                    className="mt-4 w-full bg-blue-600 text-black py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Start Hunt
                </button>
            </div>
            {showResult && (
                <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold text-green-600">Hunt Results</h2>
                    <p className="mt-2 text-black">The fugitive was hiding in: <strong className="text-green-600">{fugitiveCity}</strong></p>
                    <h3 className="text-lg text-black font-semibold mt-4">Cop Selections:</h3>
                    <ul className="mt-2">
                        {selections.map((cop, index) => (
                            <li key={index} className="text-gray-700">
                                {cop.cop} → {cop.city || "No city selected"} ({cop.vehicle || "No vehicle selected"})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default GameApp
