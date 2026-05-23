using UnityEngine;

namespace Killbox.Waves
{
    public sealed class PathRoute : MonoBehaviour
    {
        [SerializeField] private Transform[] waypoints = new Transform[0];

        public Transform[] Waypoints => waypoints;

        public void SetWaypoints(Transform[] orderedWaypoints)
        {
            waypoints = orderedWaypoints ?? new Transform[0];
        }

        private void OnDrawGizmos()
        {
            if (waypoints == null || waypoints.Length == 0)
            {
                return;
            }

            Gizmos.color = Color.yellow;
            for (int index = 0; index < waypoints.Length; index++)
            {
                Transform waypoint = waypoints[index];
                if (waypoint == null)
                {
                    continue;
                }

                Gizmos.DrawWireSphere(waypoint.position, 0.18f);

                if (index + 1 < waypoints.Length && waypoints[index + 1] != null)
                {
                    Gizmos.DrawLine(waypoint.position, waypoints[index + 1].position);
                }
            }
        }
    }
}
