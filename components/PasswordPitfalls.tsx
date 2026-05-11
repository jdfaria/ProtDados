import React from 'react';
import Section from './Section';
import { AlertTriangleIcon, KeyRoundIcon, UserIcon, RepeatIcon } from './icons';

const PitfallCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
);

const PasswordPitfalls: React.FC = () => {
    return (
        <Section title="Cuidados a ter com palavras-passe">
            <div className="grid md:grid-cols-2 gap-6">
                <PitfallCard icon={<AlertTriangleIcon className="w-7 h-7" />} title="Não uses sequências">
                    Evita caracteres sequenciais óbvios, por exemplo: “1234567" ou "abcdef".
                </PitfallCard>
                <PitfallCard icon={<UserIcon className="w-7 h-7" />} title="Não uses dados pessoais">
                    Não utilizes o teu nome, data de nascimento, número de telemóvel, etc.
                </PitfallCard>
                <PitfallCard icon={<RepeatIcon className="w-7 h-7" />} title="Evita reutilizar">
                    Evita utilizar a mesma palavra-passe em todas as redes sociais, plataformas, e-mails, etc.
                </PitfallCard>
                <PitfallCard icon={<KeyRoundIcon className="w-7 h-7" />} title="Altera regularmente">
                    Altera a tua palavra-passe regularmente, especialmente se suspeitares que foi comprometida.
                </PitfallCard>
            </div>
        </Section>
    );
};

export default PasswordPitfalls;
