import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Grid,
  CircularProgress,
} from '@mui/material';
import {
  Rock as RockIcon,
  Paper as PaperIcon,
  Scissors as ScissorsIcon,
} from '@mui/icons-material';

const JankenBattle = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
    currentStreak: 0,
    maxStreak: 0,
  });

  const choices = [
    { id: 'rock', icon: <RockIcon />, name: 'グー' },
    { id: 'paper', icon: <PaperIcon />, name: 'チョキ' },
    { id: 'scissors', icon: <ScissorsIcon />, name: 'パー' },
  ];

  const determineWinner = (player, computer) => {
    const rules = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };

    if (player === computer) return 'draw';
    if (rules[player] === computer) return 'win';
    return 'lose';
  };

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    
    // コンピューターの選択をランダムに決定
    const computerOptions = ['rock', 'paper', 'scissors'];
    const computerChoice = computerOptions[Math.floor(Math.random() * 3)];
    setComputerChoice(computerChoice);

    // 勝敗を決定
    const outcome = determineWinner(choice, computerChoice);
    setResult(outcome);

    // ステータスを更新
    const newStats = { ...stats };
    
    if (outcome === 'win') {
      newStats.wins += 1;
      newStats.currentStreak += 1;
      if (newStats.currentStreak > newStats.maxStreak) {
        newStats.maxStreak = newStats.currentStreak;
      }
    } else if (outcome === 'lose') {
      newStats.losses += 1;
      newStats.currentStreak = 0;
    } else {
      newStats.draws += 1;
    }

    setStats(newStats);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const getResultColor = () => {
    switch (result) {
      case 'win':
        return '#007bff';
      case 'lose':
        return '#dc3545';
      case 'draw':
        return '#6c757d';
      default:
        return '#fff';
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#1a1a1a',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 4,
    }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, color: '#00ff88' }}>
        じゃんけんバトル
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* プレイヤー側 */}
          <Grid item xs={12} sm={5}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                bgcolor: '#2a2a2a',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="div" align="center">
                プレイヤー
                {playerChoice && (
                  <Box
                    sx={{
                      fontSize: '4rem',
                      mt: 2,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {choices.find(c => c.id === playerChoice).icon}
                  </Box>
                )}
              </Typography>
            </Paper>
          </Grid>

          {/* VS & 結果 */}
          <Grid item xs={12} sm={2}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                bgcolor: '#2a2a2a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" component="div" sx={{ mb: 2, color: '#00ff88' }}>
                VS
              </Typography>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  color: getResultColor(),
                  fontWeight: 'bold',
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.1)',
                }}
              >
                {result ? (
                  result === 'win' ? '勝ち！' : result === 'lose' ? '負け...' : 'あいこ！'
                ) : '結果は...？'}
              </Typography>
            </Paper>
          </Grid>

          {/* コンピューター側 */}
          <Grid item xs={12} sm={5}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                bgcolor: '#2a2a2a',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="div" align="center">
                コンピューター
                {computerChoice && (
                  <Box
                    sx={{
                      fontSize: '4rem',
                      mt: 2,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {choices.find(c => c.id === computerChoice).icon}
                  </Box>
                )}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* 選択ボタン */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {choices.map((choice) => (
            <Button
              key={choice.id}
              variant="contained"
              onClick={() => handleChoice(choice.id)}
              disabled={playerChoice !== null}
              sx={{
                bgcolor: '#00ff88',
                '&:hover': {
                  bgcolor: '#00cc66',
                },
                minWidth: 120,
                height: 120,
                borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {choice.icon}
              <Typography variant="button" sx={{ mt: 1 }}>
                {choice.name}
              </Typography>
            </Button>
          ))}
        </Box>

        {/* ステータス表示 */}
        <Box sx={{ mt: 4, p: 3, bgcolor: '#2a2a2a', borderRadius: 2, width: '100%' }}>
          <Typography variant="h6" component="div" sx={{ mb: 2, color: '#00ff88' }}>
            戦績
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ color: '#007bff' }}>
                勝ち: {stats.wins}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ color: '#dc3545' }}>
                負け: {stats.losses}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ color: '#6c757d' }}>
                あいこ: {stats.draws}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: '#fff' }}>
                連勝記録: {stats.currentStreak} (最高: {stats.maxStreak})
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* リセットボタン */}
        {playerChoice && (
          <Button
            variant="contained"
            onClick={resetGame}
            sx={{
              mt: 2,
              bgcolor: '#00ff88',
              '&:hover': {
                bgcolor: '#00cc66',
              },
            }}
          >
            もう一度
          </Button>
        )}
      </Container>
    </Box>
  );
};

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <JankenBattle />
    </Box>
  );
}

export default App;
