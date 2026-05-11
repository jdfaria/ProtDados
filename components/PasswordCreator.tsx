import React, { useState, useMemo } from 'react';
import Section from './Section';

const PasswordCreator: React.FC = () => {
  const [word, setWord] = useState('Informatica');
  const [phrase, setPhrase] = useState('Gosto de Minecraft');

  const transformWord = (input: string): string => {
    return input
      .replace(/a/gi, '@')
      .replace(/e/gi, '3')
      .replace(/i/gi, '!')
      .replace(/o/gi, '0')
      .replace(/s/gi, '$')
      .replace(/t/gi, '7');
  };

  const transformPhrase = (input: string): string => {
    return input.replace(/[aeiou\s]/gi, '');
  };

  const transformedWord = useMemo(() => transformWord(word), [word]);
  const transformedPhrase = useMemo(() => transformPhrase(phrase), [phrase]);

  return (
    <Section title="Técnicas para criar palavras-passe">
        <div className="grid md:grid-cols-2 gap-8">
            {/* Technique 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-teal-700">Substituir vogais</h3>
                <p className="mb-4 text-gray-600">Substitui vogais por números e/ou caracteres especiais.</p>
                <div className="space-y-2">
                    <label htmlFor="word-input" className="font-semibold">Escreve uma palavra:</label>
                    <input
                        id="word-input"
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900"
                        placeholder="Ex: Informatica"
                    />
                </div>
                <div className="mt-4 text-center">
                    <span className="text-2xl font-mono text-gray-500">{word || "..."}</span>
                    <span className="text-2xl font-bold mx-2 text-red-500">→</span>
                    <span className="text-2xl font-mono font-bold text-gray-900 bg-white border border-gray-300 px-3 py-1 rounded-md">{transformedWord || "..."}</span>
                </div>
            </div>

            {/* Technique 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-teal-700">Criar um acrónimo</h3>
                <p className="mb-4 text-gray-600">Escreve uma frase e remove as vogais e os espaços.</p>
                <div className="space-y-2">
                    <label htmlFor="phrase-input" className="font-semibold">Escreve uma frase:</label>
                    <input
                        id="phrase-input"
                        type="text"
                        value={phrase}
                        onChange={(e) => setPhrase(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900"
                        placeholder="Ex: Gosto de Minecraft"
                    />
                </div>
                <div className="mt-4 text-center">
                    <span className="text-2xl font-mono text-gray-500">{phrase || "..."}</span>
                    <span className="text-2xl font-bold mx-2 text-red-500">→</span>
                    <span className="text-2xl font-mono font-bold text-gray-900 bg-white border border-gray-300 px-3 py-1 rounded-md">{transformedPhrase || "..."}</span>
                </div>
            </div>
        </div>
    </Section>
  );
};

export default PasswordCreator;