import React, { useState, useEffect } from 'react';
import type { PasswordStrength } from '../types';
import Section from './Section';
import { CheckIcon, XIcon } from './icons';

const StrengthCriterion: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
    <li className={`flex items-center transition-colors duration-300 ${met ? 'text-emerald-600' : 'text-gray-500'}`}>
        {met ? <CheckIcon className="w-5 h-5 mr-2" /> : <XIcon className="w-5 h-5 mr-2 text-red-400" />}
        <span>{text}</span>
    </li>
);

const PasswordChecker: React.FC = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState<PasswordStrength>({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    const [strengthScore, setStrengthScore] = useState(0);

    useEffect(() => {
        const newStrength = {
            length: password.length >= 9,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
        };
        setStrength(newStrength);
        const score = Object.values(newStrength).filter(Boolean).length;
        setStrengthScore(score);
    }, [password]);

    const strengthColors = [
        'bg-gray-200',    // 0
        'bg-red-500',     // 1
        'bg-orange-500',  // 2
        'bg-yellow-500',  // 3
        'bg-lime-500',    // 4
        'bg-emerald-500'  // 5
    ];

    const strengthText = [
        'Muito Fraca',
        'Fraca',
        'Razoável',
        'Boa',
        'Forte',
        'Muito Forte'
    ];

    return (
        <Section title="Verificador de Força da Palavra-passe">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                <div className="mb-4">
                    <label htmlFor="password-checker" className="block font-semibold mb-2">
                        Escreve uma palavra-passe para testar a sua força:
                    </label>
                    <input
                        id="password-checker"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900"
                        placeholder="A tua palavra-passe aqui..."
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 font-medium">
                        <StrengthCriterion met={strength.length} text="Pelo menos 9 caracteres" />
                        <StrengthCriterion met={strength.lowercase} text="Letra minúscula (a-z)" />
                        <StrengthCriterion met={strength.uppercase} text="Letra maiúscula (A-Z)" />
                        <StrengthCriterion met={strength.number} text="Número (0-9)" />
                        <StrengthCriterion met={strength.specialChar} text="Caractere especial (!@#...)" />
                    </ul>
                    <div className="flex flex-col justify-center items-center p-4 bg-gray-50 rounded-md">
                        <span className="font-bold text-lg mb-2">Força: <span className="text-teal-600">{strengthText[strengthScore]}</span></span>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className={`h-4 rounded-full transition-all duration-300 ${strengthColors[strengthScore]}`}
                                style={{ width: `${(strengthScore / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default PasswordChecker;