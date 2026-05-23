using UnityEngine;

namespace Killbox.Towers
{
    public sealed class BuildPad : MonoBehaviour
    {
        [SerializeField] private string padId = "PAD";
        [SerializeField] private bool occupied;

        public string PadId => padId;
        public bool IsOccupied => occupied;

        public void Configure(string id, bool isOccupied)
        {
            padId = id;
            occupied = isOccupied;
        }

        public void SetOccupied(bool value)
        {
            occupied = value;
        }
    }
}
