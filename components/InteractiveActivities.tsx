
import React, { useState, useReducer, useEffect, useRef } from 'react';
import { RefreshCwIcon } from './icons';

// --- Activity 1: Personal Data Quiz ---

const initialItems = [
  { id: 1, text: 'Nome Completo', type: 'personal' },
  { id: 2, text: 'Cor Favorita', type: 'not-personal' },
  { id: 3, text: 'Número de Telefone', type: 'personal' },
  { id: 4, text: 'Marca de Carro', type: 'not-personal' },
  { id: 5, text: 'Morada de Casa', type: 'personal' },
  { id: 6, text: 'Comida Preferida', type: 'not-personal' },
];

type Item = typeof initialItems[0];
type DropState = {
  unclassified: Item[];
  personal: Item[];
  notPersonal: Item[];
  feedback: { [key: number]: 'correct' | 'incorrect' };
};

interface PersonalDataQuizProps {
  onComplete?: (score: number, total: number) => void;
}

export const PersonalDataQuiz: React.FC<PersonalDataQuizProps> = ({ onComplete }) => {
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const onCompleteCalled = useRef(false);

  const initialDropState: DropState = {
    unclassified: [...initialItems],
    personal: [],
    notPersonal: [],
    feedback: {},
  };
  
  const [state, setState] = useState(initialDropState);
  
  useEffect(() => {
    const isComplete = state.unclassified.length === 0;
    if (isComplete && onComplete && !onCompleteCalled.current) {
      const score = Object.values(state.feedback).filter(f => f === 'correct').length;
      onComplete(score, initialItems.length);
      onCompleteCalled.current = true;
    }
  }, [state, onComplete]);


  const handleDragStart = (item: Item) => {
    if (state.unclassified.length === 0) return;
    setDraggedItem(item);
  };

  const handleDrop = (category: 'personal' | 'not-personal') => {
    if (!draggedItem || state.unclassified.length === 0) return;

    const isCorrect = draggedItem.type === category;
    const stateCategoryKey = category === 'personal' ? 'personal' : 'notPersonal';

    setState(prevState => ({
      ...prevState,
      unclassified: prevState.unclassified.filter(i => i.id !== draggedItem.id),
      [stateCategoryKey]: [...prevState[stateCategoryKey], draggedItem],
      feedback: { ...prevState.feedback, [draggedItem.id]: isCorrect ? 'correct' : 'incorrect' }
    }));
    
    setDraggedItem(null);
  };

  const getBorderColor = (id: number) => {
    if (state.feedback[id] === 'correct') return 'border-emerald-500';
    if (state.feedback[id] === 'incorrect') return 'border-red-500';
    return 'border-gray-300';
  };
  
  const isComplete = state.unclassified.length === 0;
  const score = Object.values(state.feedback).filter(f => f === 'correct').length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-teal-700">Atividade: O que são Dados Pessoais?</h3>
      </div>
      <p className="mb-4 text-gray-600">
        {isComplete 
            ? "Atividade concluída! Vê o teu resultado." 
            : "Arrasta cada item para a caixa correta para testar os teus conhecimentos."
        }
      </p>
      
      <div className="grid md:grid-cols-3 gap-4">
        {/* Unclassified Items */}
        <div className="p-4 bg-gray-50 rounded-lg min-h-[200px]">
          <h4 className="font-bold text-center mb-4">Itens</h4>
          <div className="space-y-2">
            {state.unclassified.map(item => (
              <div key={item.id} draggable onDragStart={() => handleDragStart(item)}
                className="p-2 bg-white border border-gray-300 rounded-md cursor-grab shadow-sm">
                {item.text}
              </div>
            ))}
             {isComplete && <p className="text-center text-gray-500 mt-4">Tudo classificado!</p>}
          </div>
        </div>
        {/* Drop Zones */}
        {([
            {id: 'personal', title: 'Dados Pessoais'},
            {id: 'not-personal', title: 'Não São Dados Pessoais'}
        ] as const).map(zone => (
            <div key={zone.id} 
                 onDragOver={(e) => e.preventDefault()} 
                 onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(zone.id);
                 }}
                className="p-4 bg-amber-50/50 rounded-lg border-2 border-dashed border-gray-300 min-h-[200px]">
                <h4 className="font-bold text-center mb-4 text-gray-700">{zone.title}</h4>
                <div className="space-y-2">
                    {state[zone.id === 'personal' ? 'personal' : 'notPersonal'].map(item => (
                        <div key={item.id} className={`p-2 bg-white border-2 ${getBorderColor(item.id)} rounded-md shadow-sm`}>
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
       {isComplete && (
        <div className="mt-6 text-center p-4 bg-teal-50 rounded-lg">
          <p className="text-xl font-bold text-teal-800">
            A tua pontuação: {score} / {initialItems.length} corretas!
          </p>
        </div>
      )}
    </div>
  );
};


// --- Activity 2: Spot the Risk ---

const posts = [
  { id: 1, user: 'Ana Silva', text: 'Mal posso esperar pelas férias! Vamos para o Algarve de 1 a 15 de agosto. A casa vai ficar vazia!', risky: true, explanation: 'Partilhar datas de férias e que a casa estará vazia pode atrair ladrões.' },
  { id: 2, user: 'Bruno Costa', text: 'Adorei o concerto de ontem! A música estava fantástica.', risky: false, explanation: 'Esta publicação é segura e não partilha informações pessoais sensíveis.' },
  { id: 3, user: 'Carla Dias', text: 'O meu novo número de telemóvel é 912345678. Adicionem!', risky: true, explanation: 'Publicar o número de telemóvel pode levar a chamadas e mensagens indesejadas.' },
  { id: 4, user: 'David Reis', text: 'Parabéns a mim! Finalmente 12 anos. A festa é em minha casa na Rua das Flores, nº 123, às 15h.', risky: true, explanation: 'Divulgar a idade, a morada completa e a hora de uma festa é perigoso.' },
  { id: 5, user: 'Eva Mendes', text: 'O meu cão é o mais fofo do mundo!', risky: false, explanation: 'Partilhar o amor por um animal de estimação é seguro e não revela dados pessoais.' },
];

interface SpotTheRiskGameProps {
  onComplete?: (score: number, total: number) => void;
}

export const SpotTheRiskGame: React.FC<SpotTheRiskGameProps> = ({ onComplete }) => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isVerified, setIsVerified] = useState(false);

  const handleClick = (postId: number) => {
    if (isVerified) return;

    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleVerify = () => {
    setIsVerified(true);
    if (onComplete) {
      const score = posts.filter(p => p.risky === selectedIds.has(p.id)).length;
      onComplete(score, posts.length);
    }
  };

  const getPostStyle = (post: typeof posts[0]) => {
    if (!isVerified) {
      return selectedIds.has(post.id) 
        ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500' 
        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer';
    }

    // After verification
    const isSelected = selectedIds.has(post.id);
    if (post.risky && isSelected) return 'border-emerald-500 bg-emerald-50'; // Correctly identified risk
    if (post.risky && !isSelected) return 'border-red-500 bg-red-50'; // Missed risk
    if (!post.risky && isSelected) return 'border-red-500 bg-red-50'; // Incorrectly identified as risk
    return 'border-gray-300 bg-white'; // Correctly ignored safe post
  };
  
  const score = posts.filter(p => p.risky === selectedIds.has(p.id)).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-teal-700">Atividade: Deteta o Risco</h3>
      </div>
      <p className="mb-4 text-gray-600">
        {isVerified 
            ? "Verifica o teu resultado! As publicações de risco que não selecionaste e as seguras que selecionaste estão assinaladas a vermelho."
            : "Clica nas publicações que achas que partilham demasiada informação. Depois, clica em verificar."
        }
      </p>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} onClick={() => handleClick(post.id)}
            className={`p-4 border-2 rounded-lg transition-all ${getPostStyle(post)} ${isVerified ? 'cursor-default' : ''}`}>
            <p className="font-bold">{post.user}</p>
            <p>{post.text}</p>
            {isVerified && (post.risky || selectedIds.has(post.id)) && (
                <p className={`mt-2 text-sm font-semibold ${ (post.risky && selectedIds.has(post.id)) || (!post.risky && !selectedIds.has(post.id)) ? 'text-emerald-700' : 'text-red-700'}`}>
                    {post.explanation}
                </p>
            )}
          </div>
        ))}
      </div>
      
      {!isVerified && (
        <div className="mt-6 text-center">
          <button 
            onClick={handleVerify} 
            disabled={selectedIds.size === 0}
            className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            Verificar Respostas
          </button>
        </div>
      )}

      {isVerified && (
        <div className="mt-6 text-center p-4 bg-teal-50 rounded-lg">
          <p className="text-xl font-bold text-teal-800">
            A tua pontuação: {score} / {posts.length} respostas corretas!
          </p>
        </div>
      )}
    </div>
  );
};

// --- Activity 3: Password Pitfall Matcher ---

type PitfallType = 'sequence' | 'personal' | 'reuse' | 'weak';
const pitfalls: { id: PitfallType; title: string }[] = [
    { id: 'sequence', title: 'Usa Sequências' },
    { id: 'personal', title: 'Usa Dados Pessoais' },
    { id: 'reuse', title: 'Reutiliza Passwords' },
    { id: 'weak', title: 'Password Curta/Simples' },
];

const weakPasswords: { id: number; text: string; type: PitfallType }[] = [
    { id: 1, text: '1234567', type: 'sequence' },
    { id: 2, text: 'password123', type: 'reuse' },
    { id: 3, text: 'JoaoSantos2010', type: 'personal' },
    { id: 4, text: 'gato', type: 'weak' },
];

interface PasswordPitfallMatcherProps {
    onComplete?: (score: number, total: number) => void;
}

export const PasswordPitfallMatcher: React.FC<PasswordPitfallMatcherProps> = ({ onComplete }) => {
    const [passwords, setPasswords] = useState(weakPasswords);
    const [dropped, setDropped] = useState<{ [key in PitfallType]?: typeof weakPasswords[0] }>({});
    const [dragged, setDragged] = useState<typeof weakPasswords[0] | null>(null);
    const [isVerified, setIsVerified] = useState(false);

    const handleDragStart = (pwd: typeof weakPasswords[0]) => {
        if(isVerified) return;
        setDragged(pwd);
    };

    const handleDrop = (pitfallId: PitfallType) => {
        if (!dragged || isVerified || dropped[pitfallId]) return;
        
        setPasswords(passwords.filter(p => p.id !== dragged.id));
        setDropped(prev => ({ ...prev, [pitfallId]: dragged }));
        setDragged(null);
    };
    
    const handleVerify = () => {
        setIsVerified(true);
        if (onComplete) {
          const score = Object.entries(dropped).filter(([pitfallId, pwd]) => pwd && pwd.type === pitfallId).length;
          onComplete(score, weakPasswords.length);
        }
    };
    
    const score = Object.entries(dropped).filter(([pitfallId, pwd]) => pwd && pwd.type === pitfallId).length;

    const getDropZoneStyle = (pitfallId: PitfallType) => {
        if (!isVerified) return 'border-gray-300';
        const pwd = dropped[pitfallId];
        if (!pwd) return 'border-red-400';
        return pwd.type === pitfallId ? 'border-emerald-500' : 'border-red-500';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-teal-700">Atividade: Combina as Armadilhas</h3>
            <p className="mb-4 text-gray-600">Arrasta cada password para o erro que ela representa. Depois, verifica as tuas respostas.</p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Passwords to drag */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-center mb-4">Passwords Fracas</h4>
                    <div className="space-y-2">
                        {passwords.map(pwd => (
                            <div key={pwd.id} draggable onDragStart={() => handleDragStart(pwd)} className="p-2 bg-white border border-gray-300 rounded-md cursor-grab shadow-sm font-mono text-center">
                                {pwd.text}
                            </div>
                        ))}
                         {passwords.length === 0 && !isVerified && <p className="text-center text-gray-500 mt-4">Tudo combinado! Clica em verificar.</p>}
                    </div>
                </div>

                {/* Pitfall drop zones */}
                <div className="space-y-4">
                    {pitfalls.map(pitfall => (
                        <div key={pitfall.id} 
                             onDragOver={(e) => e.preventDefault()}
                             onDrop={() => handleDrop(pitfall.id)}
                             className={`p-4 rounded-lg border-2 border-dashed transition-colors ${getDropZoneStyle(pitfall.id)}`}>
                            <h4 className="font-semibold text-gray-700">{pitfall.title}</h4>
                            <div className="mt-2 min-h-[40px]">
                                {dropped[pitfall.id] && (
                                    <div className="p-2 bg-white border border-gray-300 rounded-md shadow-sm font-mono text-center">
                                        {dropped[pitfall.id]?.text}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {!isVerified && (
                <div className="mt-6 text-center">
                <button 
                    onClick={handleVerify} 
                    disabled={passwords.length > 0}
                    className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Verificar Respostas
                </button>
                </div>
            )}
            
            {isVerified && (
                <div className="mt-6 text-center p-4 bg-teal-50 rounded-lg">
                <p className="text-xl font-bold text-teal-800">
                    A tua pontuação: {score} / {weakPasswords.length} corretas!
                </p>
                </div>
            )}
        </div>
    );
};


// --- Activity 4: Password Strength Quiz ---

const questions = [
  { pair: ['F0rt3!#', 'cavalo-amarelo-corre-no-campo'], strongerIndex: 1, explanation: 'O comprimento é um dos fatores mais importantes. Uma frase longa (passphrase) é muitas vezes mais segura do que uma palavra curta e complexa.' },
  { pair: ['P@ssw0rd_Segur@', 'xK!9$pZq-eR*b'], strongerIndex: 1, explanation: 'Substituições óbvias (como @ por a, 0 por o) são facilmente adivinhadas por programas. A aleatoriedade real é muito mais segura.' },
  { pair: ['qwert12345', 'qW1eR2tY3uI4'], strongerIndex: 1, explanation: 'Passwords baseadas em padrões de teclado (como "qwerty") são uma das primeiras coisas que os atacantes tentam. Misturar maiúsculas e minúsculas de forma aleatória quebra o padrão.' },
  { pair: ['Lisboa-viagem-2024', 'TigreAzulComeuPudim'], strongerIndex: 1, explanation: 'Informações sobre eventos da sua vida (viagens, datas) podem ser descobertas. Uma frase aleatória e sem sentido é muito mais segura.' },
  { pair: ['FacebookPass2025!', '7-yU!pZq_mB(c'], strongerIndex: 1, explanation: 'Reutilizar passwords, mesmo com pequenas alterações, é muito arriscado. Se uma for descoberta, as outras também ficam vulneráveis. Crie sempre passwords únicas.' },
  { pair: ['Computador#123', 'quatro-janelas-verdes-abertas'], strongerIndex: 1, explanation: 'Mesmo com símbolos e números, uma password baseada numa única palavra comum é mais fraca do que uma passphrase longa e memorizável com várias palavras.' },
];

type QuizState = {
  currentQuestion: number;
  score: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
};
type QuizAction = | { type: 'ANSWER'; payload: number } | { type: 'NEXT' };

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
    switch(action.type) {
        case 'ANSWER': {
            const isCorrect = action.payload === questions[state.currentQuestion].strongerIndex;
            return {
                ...state,
                selectedAnswer: action.payload,
                showFeedback: true,
                score: isCorrect ? state.score + 1 : state.score
            }
        }
        case 'NEXT': {
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1,
                selectedAnswer: null,
                showFeedback: false,
            }
        }
        default: return state;
    }
}

interface PasswordStrengthQuizProps {
  onComplete?: (score: number, total: number) => void;
}

export const PasswordStrengthQuiz: React.FC<PasswordStrengthQuizProps> = ({ onComplete }) => {
    const [state, dispatch] = useReducer(quizReducer, { currentQuestion: 0, score: 0, selectedAnswer: null, showFeedback: false });
    const { currentQuestion, score, selectedAnswer, showFeedback } = state;
    const onCompleteCalled = useRef(false);

    const isFinished = currentQuestion >= questions.length;
    const currentQ = questions[currentQuestion];

    useEffect(() => {
        if (isFinished && onComplete && !onCompleteCalled.current) {
            onComplete(score, questions.length);
            onCompleteCalled.current = true;
        }
    }, [isFinished, onComplete, score]);


    const getButtonClass = (index: number) => {
        if (!showFeedback) return 'bg-white hover:bg-gray-100';
        const isCorrectChoice = index === currentQ.strongerIndex;
        if(index === selectedAnswer){
            return isCorrectChoice ? 'bg-emerald-100 border-emerald-500' : 'bg-red-100 border-red-500';
        }
        return 'bg-white';
    }

    if (isFinished) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                 <h3 className="text-xl font-bold text-teal-700 mb-2">Quiz Terminado!</h3>
                 <p className="text-2xl mb-4">A tua pontuação final: <span className="font-bold">{score} / {questions.length}</span></p>
                 <p className="text-gray-600">Podes avançar para o teu certificado.</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-teal-700 mb-1">Atividade: Qual é mais segura?</h3>
            <p className="text-gray-600 mb-4">Pergunta {currentQuestion + 1} de {questions.length}</p>
            <p className="font-semibold text-lg mb-4">Clica na palavra-passe que consideras ser mais forte:</p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {currentQ.pair.map((pwd, index) => (
                    <button key={index} onClick={() => dispatch({type: 'ANSWER', payload: index})} disabled={showFeedback}
                        className={`p-4 border-2 rounded-lg text-center font-mono text-lg transition-colors duration-300 ${getButtonClass(index)} disabled:cursor-not-allowed`}>
                        {pwd}
                    </button>
                ))}
            </div>

            {showFeedback && (
                <div className="p-4 bg-yellow-100/60 rounded-lg text-center">
                    <p className="font-semibold mb-2">{selectedAnswer === currentQ.strongerIndex ? 'Boa escolha!' : 'Não exatamente.'}</p>
                    <p className="text-gray-700">{currentQ.explanation}</p>
                    <button onClick={() => dispatch({type: 'NEXT'})} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-semibold">
                        Próxima Pergunta
                    </button>
                </div>
            )}
        </div>
    )
};
