using UnityEngine;

namespace Killbox.Core
{
    public sealed class Objective : MonoBehaviour
    {
        [SerializeField] private int maxHitPoints = 100;
        [SerializeField] private int currentHitPoints = 100;

        public int MaxHitPoints => maxHitPoints;
        public int CurrentHitPoints => currentHitPoints;
        public float NormalizedHitPoints => maxHitPoints <= 0 ? 0f : (float)currentHitPoints / maxHitPoints;

        public void Configure(int maxHp, int currentHp)
        {
            maxHitPoints = Mathf.Max(1, maxHp);
            currentHitPoints = Mathf.Clamp(currentHp, 0, maxHitPoints);
        }

        public void ResetHitPoints()
        {
            currentHitPoints = maxHitPoints;
        }

        public void SetCurrentHitPoints(int value)
        {
            currentHitPoints = Mathf.Clamp(value, 0, maxHitPoints);
        }
    }
}
