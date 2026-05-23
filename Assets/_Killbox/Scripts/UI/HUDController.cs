using UnityEngine;

namespace Killbox.UI
{
    public sealed class HUDController : MonoBehaviour
    {
        [SerializeField] private TextMesh objectiveText;
        [SerializeField] private TextMesh goldText;
        [SerializeField] private TextMesh waveText;
        [SerializeField] private MessageLog messageLog;

        public void Configure(TextMesh objective, TextMesh gold, TextMesh wave, MessageLog log)
        {
            objectiveText = objective;
            goldText = gold;
            waveText = wave;
            messageLog = log;
        }

        public void ShowPlaceholderValues(int currentObjectiveHp, int maxObjectiveHp, int sharedGold, int currentWave, int totalWaves)
        {
            if (objectiveText != null)
            {
                objectiveText.text = $"Objective HP: {currentObjectiveHp}/{maxObjectiveHp}";
            }

            if (goldText != null)
            {
                goldText.text = $"Shared Gold: {sharedGold}";
            }

            if (waveText != null)
            {
                waveText.text = $"Wave: {currentWave}/{totalWaves}";
            }

            if (messageLog != null && !messageLog.HasMessages)
            {
                messageLog.Add("Prototype arena foundation ready.");
            }
        }
    }
}
