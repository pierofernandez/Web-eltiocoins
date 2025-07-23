import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, useCustomer } from '../hooks';

interface Prize {
    id: number;
    name: string;
    type: 'coins' | 'boosting' | 'game' | 'discount';
    value: string;
    color: string;
    probability: number;
    icon: string;
    discountCode?: string;
}

const prizes: Prize[] = [
    { id: 1, name: 'EA FC 26 GRATIS', type: 'game', value: 'Juego Completo', color: '#FFD700', probability: 0.5, icon: '🎮' },
    { id: 2, name: '100,000 Monedas', type: 'coins', value: '100K', color: '#FF6B35', probability: 5, icon: '🪙' },
    { id: 3, name: '50,000 Monedas', type: 'coins', value: '50K', color: '#FF8C42', probability: 10, icon: '🪙' },
    { id: 4, name: '25,000 Monedas', type: 'coins', value: '25K', color: '#FFA500', probability: 15, icon: '🪙' },
    { id: 5, name: 'Boosting Elite', type: 'boosting', value: 'Elite', color: '#8A2BE2', probability: 8, icon: '⚡' },
    { id: 6, name: 'Boosting Pro', type: 'boosting', value: 'Pro', color: '#9370DB', probability: 12, icon: '⚡' },
    { id: 7, name: '10,000 Monedas', type: 'coins', value: '10K', color: '#FFB347', probability: 20, icon: '🪙' },
    { id: 8, name: '5,000 Monedas', type: 'coins', value: '5K', color: '#FFC0CB', probability: 29.5, icon: '🪙' },
];

// Función para generar códigos de descuento
const generateDiscountCode = (prize: Prize): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    
    switch (prize.type) {
        case 'game':
            return `EAFC26-${timestamp.toUpperCase()}`;
        case 'coins':
            return `COINS-${prize.value}-${random.toUpperCase()}`;
        case 'boosting':
            return `BOOST-${prize.value.toUpperCase()}-${random.toUpperCase()}`;
        default:
            return `PRIZE-${random.toUpperCase()}`;
    }
};

// Función para obtener premio aleatorio
const getRandomPrize = (): Prize => {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;
    
    for (const prize of prizes) {
        cumulativeProbability += prize.probability;
        if (random <= cumulativeProbability) {
            return prize;
        }
    }
    return prizes[prizes.length - 1];
};

// Función para verificar victoria
const checkWin = (board: (string | null)[][], player: string): boolean => {
    // Verificar filas
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true;
        }
    }
    
    // Verificar columnas
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
            return true;
        }
    }
    
    // Verificar diagonales
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return true;
    }
    
    return false;
};

// IA simple para el juego
const makeAIMove = (board: (string | null)[][]): [number, number] => {
    const emptyCells: [number, number][] = [];
    
    // Encontrar todas las celdas vacías
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) {
                emptyCells.push([i, j]);
            }
        }
    }
    
    // Si no hay celdas vacías, retornar una posición inválida
    if (emptyCells.length === 0) {
        return [-1, -1];
    }
    
    // Estrategia simple: bloquear al jugador si puede ganar, sino hacer movimiento aleatorio
    // Verificar si el jugador puede ganar en el siguiente movimiento
    for (const [row, col] of emptyCells) {
        const testBoard = board.map(row => [...row]);
        testBoard[row][col] = 'X';
        if (checkWin(testBoard, 'X')) {
            return [row, col]; // Bloquear al jugador
        }
    }
    
    // Verificar si la IA puede ganar
    for (const [row, col] of emptyCells) {
        const testBoard = board.map(row => [...row]);
        testBoard[row][col] = 'O';
        if (checkWin(testBoard, 'O')) {
            return [row, col]; // Ganar si es posible
        }
    }
    
    // Si no hay movimientos estratégicos, elegir aleatoriamente
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
};

export const JuegaYGanaPage = () => {
    const { session } = useUser();
    const userId = session?.user.id;
    const { data: customer } = useCustomer(userId!);

    const [board, setBoard] = useState<(string | null)[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [wonPrize, setWonPrize] = useState<Prize | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [gamesLeft, setGamesLeft] = useState(3);
    const [discountCode, setDiscountCode] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAITurn, setIsAITurn] = useState(false);

    const initializeGame = () => {
        if (gamesLeft <= 0 || isPlaying) return;
        
        setIsPlaying(true);
        setGameOver(false);
        setWinner(null);
        setWonPrize(null);
        setShowResult(false);
        setDiscountCode('');
        setCurrentPlayer('X');
        setIsAITurn(false);
        
        setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    };

    const isBoardFull = (board: (string | null)[][]): boolean => {
        return board.every(row => row.every(cell => cell !== null));
    };

    const handlePlayerMove = (row: number, col: number) => {
        if (gameOver || board[row][col] || isAITurn || !isPlaying) return;

        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = 'X';
        setBoard(newBoard);

        // Verificar si el jugador ganó
        if (checkWin(newBoard, 'X')) {
            handleGameEnd('X');
            return;
        }

        // Verificar empate
        if (isBoardFull(newBoard)) {
            handleGameEnd('tie');
            return;
        }

        // Turno de la IA
        setCurrentPlayer('O');
        setIsAITurn(true);
        
        // Pequeño delay para que se vea el movimiento del jugador
        setTimeout(() => {
            handleAIMove(newBoard);
        }, 500);
    };

    const handleAIMove = (currentBoard: (string | null)[][]) => {
        const [aiRow, aiCol] = makeAIMove(currentBoard);
        
        if (aiRow === -1 || aiCol === -1) return;

        const newBoard = currentBoard.map(row => [...row]);
        newBoard[aiRow][aiCol] = 'O';
        setBoard(newBoard);

        // Verificar si la IA ganó
        if (checkWin(newBoard, 'O')) {
            handleGameEnd('O');
            return;
        }

        // Verificar empate
        if (isBoardFull(newBoard)) {
            handleGameEnd('tie');
            return;
        }

        // Volver al turno del jugador
        setCurrentPlayer('X');
        setIsAITurn(false);
    };

    const handleGameEnd = (result: string) => {
        setGameOver(true);
        setIsPlaying(false);
        setIsAITurn(false);
        setGamesLeft(prev => prev - 1);

        if (result === 'X') {
            // Jugador ganó
            setWinner('X');
            const prize = getRandomPrize();
            setWonPrize(prize);
            setShowResult(true);
            const code = generateDiscountCode(prize);
            setDiscountCode(code);
        } else if (result === 'O') {
            // IA ganó
            setWinner('O');
        } else {
            // Empate
            setWinner('tie');
        }
    };

    const resetGames = () => {
        setGamesLeft(3);
        setWonPrize(null);
        setShowResult(false);
        setDiscountCode('');
        setGameOver(false);
        setIsPlaying(false);
        setWinner(null);
        setCurrentPlayer('X');
        setIsAITurn(false);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(discountCode);
        } catch (err) {
            console.error('Error al copiar al portapapeles:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
            {/* Efectos de fondo animados */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                
                {/* Partículas flotantes */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Información del usuario logueado */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full border border-white/20">
                        <div className="w-3 h-3 bg-green-200 rounded-full animate-pulse"></div>
                        <span className="text-white font-semibold">
                            ¡Bienvenido, {customer?.full_name || session?.user.email?.split('@')[0] || 'Jugador'}!
                        </span>
                    </div>
                </motion.div>

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6"
                    >
                        <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse"></div>
                        <span className="text-black font-bold text-lg tracking-wider uppercase">¡JUEGA Y GANA!</span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight"
                    >
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            MICHI
                        </span>
                        <br />
                        <span className="text-white drop-shadow-2xl">
                            VS IA
                        </span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        ¡Vence a la IA y gana monedas, boosting o incluso EA FC 26 gratis!
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-4"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                            <span className="text-blue-400 text-sm">🔒</span>
                            <span className="text-blue-300 text-sm font-medium">
                                Juego exclusivo para usuarios registrados
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Contador de juegos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full border border-white/20">
                        <span className="text-white font-semibold">Juegos restantes:</span>
                        <span className="text-2xl font-bold text-yellow-400">{gamesLeft}</span>
                        {gamesLeft === 0 && (
                            <button
                                onClick={resetGames}
                                className="ml-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                            >
                                Recargar
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Indicador de turno */}
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full border border-white/20">
                            <span className="text-white font-semibold">Turno de:</span>
                            <span className={`text-2xl font-bold ${currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}`}>
                                {currentPlayer === 'X' ? 'TÚ (X)' : 'IA (O)'}
                            </span>
                            {isAITurn && (
                                <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Tablero de Michi */}
                <div className="flex justify-center items-center mb-12">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                        >
                            <div className="grid grid-cols-3 gap-4">
                                {board.map((row, rowIndex) => 
                                    row.map((cell, colIndex) => (
                                        <motion.button
                                            key={`${rowIndex}-${colIndex}`}
                                            whileHover={{ scale: cell ? 1 : 1.05 }}
                                            whileTap={{ scale: cell ? 1 : 0.95 }}
                                            onClick={() => handlePlayerMove(rowIndex, colIndex)}
                                            disabled={gameOver || !!cell || isAITurn || !isPlaying}
                                            className={`w-24 h-24 md:w-32 md:h-32 rounded-xl border-2 transition-all duration-300 flex items-center justify-center text-4xl md:text-5xl font-bold ${
                                                cell === 'X'
                                                    ? 'border-blue-400 bg-blue-500/20 text-blue-400'
                                                    : cell === 'O'
                                                    ? 'border-red-400 bg-red-500/20 text-red-400'
                                                    : gameOver || !isPlaying
                                                    ? 'border-gray-500 bg-gray-500/20 cursor-not-allowed'
                                                    : 'border-white/30 bg-white/10 hover:border-yellow-400 hover:bg-yellow-400/20 cursor-pointer'
                                            }`}
                                        >
                                            {cell}
                                        </motion.button>
                                    ))
                                )}
                            </div>
                        </motion.div>

                        {/* Botón de iniciar juego */}
                        {!isPlaying && gamesLeft > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={initializeGame}
                                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-xl shadow-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
                                >
                                    🎮 JUGAR VS IA
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Resultado del juego */}
                        {gameOver && winner && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                            >
                                <div className="text-center">
                                    <div className="text-4xl mb-2">
                                        {winner === 'X' ? '🎉' : winner === 'O' ? '😔' : '🤝'}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {winner === 'X' ? '¡GANASTE!' : winner === 'O' ? 'Perdiste' : 'Empate'}
                                    </h3>
                                    <p className="text-gray-300">
                                        {winner === 'X' ? '¡Felicidades! Has vencido a la IA' : 
                                         winner === 'O' ? 'La IA te ha vencido' : 'Nadie ganó esta ronda'}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Resultado con Código de Descuento */}
                <AnimatePresence>
                    {showResult && wonPrize && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-block p-8 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20 max-w-md">
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-3xl font-bold text-white mb-2">¡GANASTE!</h3>
                                <div className="text-4xl mb-4">{wonPrize.icon}</div>
                                <h4 className="text-2xl font-bold text-white mb-2">{wonPrize.name}</h4>
                                <p className="text-xl text-gray-300 mb-4">¡Felicidades! Has ganado</p>
                                
                                {/* Código de descuento */}
                                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg mb-4">
                                    <p className="text-white font-semibold mb-2">Tu código de descuento:</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <code className="bg-black/30 px-4 py-2 rounded text-yellow-400 font-mono text-lg font-bold">
                                            {discountCode}
                                        </code>
                                        <button
                                            onClick={copyToClipboard}
                                            className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded transition-colors duration-200"
                                            title="Copiar código"
                                        >
                                            📋
                                        </button>
                                    </div>
                                </div>

                                {wonPrize.type === 'game' && (
                                    <div className="mt-4 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                                        <p className="text-white font-bold">🎉 ¡EA FC 26 GRATIS! 🎉</p>
                                        <p className="text-sm mt-1">Usa el código para activar tu juego</p>
                                    </div>
                                )}

                                <div className="mt-4 text-sm text-gray-400">
                                    <p>• El código es válido por 24 horas</p>
                                    <p>• Úsalo en el checkout para aplicar el descuento</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Premios disponibles */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Premios Disponibles</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {prizes.map((prize) => (
                            <div
                                key={prize.id}
                                className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center hover:bg-black/50 transition-all duration-300"
                            >
                                <div className="text-3xl mb-2">{prize.icon}</div>
                                <h3 className="font-bold text-white mb-1">{prize.name}</h3>
                                <p className="text-sm text-gray-400">{prize.probability}%</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Información adicional */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-center mt-12 text-gray-400"
                >
                    <p className="text-sm">
                        * Solo ganas premios si vences a la IA.
                    </p>
                    <p className="text-sm mt-2">
                        * La probabilidad de ganar EA FC 26 es del 0.5%.
                    </p>
                    <p className="text-sm mt-2">
                        * Los códigos son válidos por 24 horas desde su generación.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default JuegaYGanaPage; 