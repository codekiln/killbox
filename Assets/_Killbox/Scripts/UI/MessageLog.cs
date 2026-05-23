using System.Collections.Generic;
using UnityEngine;

namespace Killbox.UI
{
    public sealed class MessageLog : MonoBehaviour
    {
        [SerializeField] private TextMesh targetText;
        [SerializeField] private int maxLines = 3;

        private readonly Queue<string> messages = new Queue<string>();

        public bool HasMessages => messages.Count > 0;

        public void Configure(TextMesh text)
        {
            targetText = text;
            Refresh();
        }

        public void Add(string message)
        {
            if (string.IsNullOrWhiteSpace(message))
            {
                return;
            }

            messages.Enqueue(message);
            while (messages.Count > maxLines)
            {
                messages.Dequeue();
            }

            Refresh();
        }

        private void Refresh()
        {
            if (targetText == null)
            {
                return;
            }

            targetText.text = messages.Count == 0
                ? "Message Log: waiting for prototype events"
                : string.Join("\n", messages);
        }
    }
}
