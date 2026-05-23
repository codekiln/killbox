using System.Collections.Generic;
using Killbox.Towers;
using Killbox.UI;
using Killbox.Waves;
using UnityEngine;

namespace Killbox.Core
{
    [ExecuteAlways]
    public sealed class PrototypeBootstrap : MonoBehaviour
    {
        private const string GeneratedRootName = "__GeneratedPrototypeArena";

        [SerializeField] private Camera sceneCamera;
        [SerializeField] private int objectiveMaxHitPoints = 100;
        [SerializeField] private int startingSharedGold = 300;
        [SerializeField] private int currentWave = 0;
        [SerializeField] private int totalWaves = 5;

        private static readonly Vector3[] PathA =
        {
            new Vector3(-7f, 2.7f, 0f),
            new Vector3(-4.2f, 2.3f, 0f),
            new Vector3(-1.4f, 1.25f, 0f),
            new Vector3(2.1f, 0.75f, 0f),
            new Vector3(4.6f, 0f, 0f),
            new Vector3(6.4f, 0f, 0f)
        };

        private static readonly Vector3[] PathB =
        {
            new Vector3(-7f, -2.7f, 0f),
            new Vector3(-4.2f, -2.3f, 0f),
            new Vector3(-1.4f, -1.25f, 0f),
            new Vector3(2.1f, -0.75f, 0f),
            new Vector3(4.6f, 0f, 0f),
            new Vector3(6.4f, 0f, 0f)
        };

        private static readonly Vector2[] BuildPadPositions =
        {
            new Vector2(-5.4f, 1.25f),
            new Vector2(-3.1f, 3.1f),
            new Vector2(-1.2f, 2.45f),
            new Vector2(1.25f, 1.75f),
            new Vector2(-5.4f, -1.25f),
            new Vector2(-3.1f, -3.1f),
            new Vector2(-1.2f, -2.45f),
            new Vector2(1.25f, -1.75f)
        };

        private readonly List<Material> runtimeMaterials = new List<Material>();

        private void OnEnable()
        {
            RebuildArena();
        }

        private void Start()
        {
            RebuildArena();
        }

        [ContextMenu("Rebuild Prototype Arena")]
        public void RebuildArena()
        {
            ClearGenerated();
            ConfigureCamera();

            Transform root = CreateGeneratedRoot();
            CreateBattlefield(root);
            CreatePath(root, "Path A - Upper Lane", PathA, new Color(1f, 0.62f, 0.12f));
            CreatePath(root, "Path B - Lower Lane", PathB, new Color(0.2f, 0.8f, 1f));
            CreateEntrances(root);
            CreateObjective(root);
            CreateBuildPads(root);
            CreateHud(root);
        }

        private void ConfigureCamera()
        {
            if (sceneCamera == null)
            {
                sceneCamera = Camera.main;
            }

            if (sceneCamera == null)
            {
                return;
            }

            sceneCamera.orthographic = true;
            sceneCamera.orthographicSize = 5.7f;
            sceneCamera.transform.position = new Vector3(0f, 0f, -10f);
            sceneCamera.transform.rotation = Quaternion.identity;
            sceneCamera.backgroundColor = new Color(0.08f, 0.09f, 0.1f);
        }

        private Transform CreateGeneratedRoot()
        {
            var root = new GameObject(GeneratedRootName);
            root.hideFlags = Application.isPlaying ? HideFlags.None : HideFlags.DontSaveInEditor;
            root.transform.SetParent(transform, false);
            return root.transform;
        }

        private void ClearGenerated()
        {
            for (int index = transform.childCount - 1; index >= 0; index--)
            {
                Transform child = transform.GetChild(index);
                if (child.name == GeneratedRootName)
                {
                    DestroyObject(child.gameObject);
                }
            }

            foreach (Material material in runtimeMaterials)
            {
                if (material != null)
                {
                    DestroyObject(material);
                }
            }

            runtimeMaterials.Clear();
        }

        private void CreateBattlefield(Transform root)
        {
            CreateBox(root, "Battlefield Rectangle", new Vector3(0f, 0f, 0.45f), new Vector2(15f, 8.2f), new Color(0.18f, 0.2f, 0.22f));
            CreateBox(root, "Battlefield Border Top", new Vector3(0f, 4.15f, 0.35f), new Vector2(15.25f, 0.12f), new Color(0.05f, 0.05f, 0.05f), 0.08f);
            CreateBox(root, "Battlefield Border Bottom", new Vector3(0f, -4.15f, 0.35f), new Vector2(15.25f, 0.12f), new Color(0.05f, 0.05f, 0.05f), 0.08f);
            CreateBox(root, "Battlefield Border Left", new Vector3(-7.65f, 0f, 0.35f), new Vector2(0.12f, 8.45f), new Color(0.05f, 0.05f, 0.05f), 0.08f);
            CreateBox(root, "Battlefield Border Right", new Vector3(7.65f, 0f, 0.35f), new Vector2(0.12f, 8.45f), new Color(0.05f, 0.05f, 0.05f), 0.08f);
            CreateLabel(root, "ONE UGLY MAP - PROTOTYPE ARENA", new Vector2(0f, 3.95f), 0.26f, Color.white);
            CreateLabel(root, "MERGE", new Vector2(4.6f, 0.42f), 0.18f, Color.yellow);
        }

        private void CreateEntrances(Transform root)
        {
            CreateBox(root, "Entrance A", new Vector2(PathA[0].x, PathA[0].y), new Vector2(0.9f, 0.9f), new Color(0.85f, 0.2f, 0.18f));
            CreateLabel(root, "ENTRANCE A", new Vector2(PathA[0].x, PathA[0].y + 0.75f), 0.16f, Color.white);

            CreateBox(root, "Entrance B", new Vector2(PathB[0].x, PathB[0].y), new Vector2(0.9f, 0.9f), new Color(0.85f, 0.2f, 0.18f));
            CreateLabel(root, "ENTRANCE B", new Vector2(PathB[0].x, PathB[0].y - 0.75f), 0.16f, Color.white);
        }

        private void CreateObjective(Transform root)
        {
            GameObject objective = CreateBox(root, "Defended Objective", new Vector2(6.6f, 0f), new Vector2(1.1f, 1.7f), new Color(0.15f, 0.8f, 0.35f));
            objective.AddComponent<Objective>().Configure(objectiveMaxHitPoints, objectiveMaxHitPoints);
            CreateLabel(root, "OBJECTIVE\nHP 100/100", new Vector2(6.6f, -1.25f), 0.16f, Color.white);
        }

        private void CreateBuildPads(Transform root)
        {
            for (int index = 0; index < BuildPadPositions.Length; index++)
            {
                Vector2 position = BuildPadPositions[index];
                string padId = $"PAD {index + 1}";
                GameObject pad = CreateBox(root, $"Build Pad {index + 1}", position, new Vector2(0.72f, 0.72f), new Color(0.9f, 0.75f, 0.2f));
                pad.AddComponent<BuildPad>().Configure(padId, false);
                CreateLabel(root, padId, position + new Vector2(0f, -0.55f), 0.12f, Color.black);
            }
        }

        private void CreatePath(Transform root, string name, Vector3[] points, Color color)
        {
            var pathObject = new GameObject(name);
            pathObject.hideFlags = Application.isPlaying ? HideFlags.None : HideFlags.DontSaveInEditor;
            pathObject.transform.SetParent(root, false);

            var route = pathObject.AddComponent<PathRoute>();
            var waypoints = new Transform[points.Length];
            for (int index = 0; index < points.Length; index++)
            {
                GameObject waypoint = CreateBox(pathObject.transform, $"Waypoint {index + 1}", points[index], new Vector2(0.3f, 0.3f), color);
                waypoints[index] = waypoint.transform;
                CreateLabel(pathObject.transform, (index + 1).ToString(), points[index] + new Vector3(0f, 0.28f, 0f), 0.1f, Color.white);
            }

            route.SetWaypoints(waypoints);

            var line = pathObject.AddComponent<LineRenderer>();
            line.positionCount = points.Length;
            line.SetPositions(points);
            line.startWidth = 0.12f;
            line.endWidth = 0.12f;
            line.useWorldSpace = true;
            line.material = CreateMaterial(color);
            line.sortingOrder = 3;

            CreateLabel(pathObject.transform, name, points[1] + new Vector3(0f, 0.45f * Mathf.Sign(points[1].y), 0f), 0.16f, Color.white);
        }

        private void CreateHud(Transform root)
        {
            var hudRoot = new GameObject("HUD Placeholders");
            hudRoot.hideFlags = Application.isPlaying ? HideFlags.None : HideFlags.DontSaveInEditor;
            hudRoot.transform.SetParent(root, false);

            TextMesh objectiveText = CreateLabel(hudRoot.transform, "", new Vector2(-7.15f, 4.75f), 0.18f, Color.white);
            TextMesh goldText = CreateLabel(hudRoot.transform, "", new Vector2(-3.95f, 4.75f), 0.18f, Color.white);
            TextMesh waveText = CreateLabel(hudRoot.transform, "", new Vector2(-1.05f, 4.75f), 0.18f, Color.white);
            TextMesh messageText = CreateLabel(hudRoot.transform, "", new Vector2(2.95f, 4.75f), 0.18f, Color.yellow);

            MessageLog messageLog = hudRoot.AddComponent<MessageLog>();
            messageLog.Configure(messageText);
            messageLog.Add("Scene foundation: map, paths, pads, objective, HUD.");

            HUDController hud = hudRoot.AddComponent<HUDController>();
            hud.Configure(objectiveText, goldText, waveText, messageLog);
            hud.ShowPlaceholderValues(objectiveMaxHitPoints, objectiveMaxHitPoints, startingSharedGold, currentWave, totalWaves);
        }

        private GameObject CreateBox(Transform parent, string name, Vector2 position, Vector2 size, Color color, float zSize = 0.05f)
        {
            return CreateBox(parent, name, new Vector3(position.x, position.y, 0f), size, color, zSize);
        }

        private GameObject CreateBox(Transform parent, string name, Vector3 position, Vector2 size, Color color, float zSize = 0.05f)
        {
            GameObject box = GameObject.CreatePrimitive(PrimitiveType.Cube);
            box.name = name;
            box.hideFlags = Application.isPlaying ? HideFlags.None : HideFlags.DontSaveInEditor;
            box.transform.SetParent(parent, false);
            box.transform.position = position;
            box.transform.localScale = new Vector3(size.x, size.y, zSize);

            if (box.TryGetComponent(out Collider collider))
            {
                DestroyObject(collider);
            }

            Renderer renderer = box.GetComponent<Renderer>();
            renderer.sharedMaterial = CreateMaterial(color);
            return box;
        }

        private TextMesh CreateLabel(Transform parent, string text, Vector2 position, float size, Color color)
        {
            return CreateLabel(parent, text, new Vector3(position.x, position.y, -0.2f), size, color);
        }

        private TextMesh CreateLabel(Transform parent, string text, Vector3 position, float size, Color color)
        {
            var label = new GameObject($"Label - {text}");
            label.hideFlags = Application.isPlaying ? HideFlags.None : HideFlags.DontSaveInEditor;
            label.transform.SetParent(parent, false);
            label.transform.position = position;

            TextMesh mesh = label.AddComponent<TextMesh>();
            mesh.text = text;
            mesh.anchor = TextAnchor.MiddleCenter;
            mesh.alignment = TextAlignment.Center;
            mesh.characterSize = size;
            mesh.fontSize = 32;
            mesh.color = color;
            return mesh;
        }

        private Material CreateMaterial(Color color)
        {
            Shader shader = Shader.Find("Sprites/Default") ?? Shader.Find("Unlit/Color") ?? Shader.Find("Standard");
            var material = new Material(shader)
            {
                color = color,
                hideFlags = Application.isPlaying ? HideFlags.None : HideFlags.DontSaveInEditor
            };
            runtimeMaterials.Add(material);
            return material;
        }

        private static void DestroyObject(Object target)
        {
            if (target == null)
            {
                return;
            }

            if (Application.isPlaying)
            {
                Destroy(target);
            }
            else
            {
                DestroyImmediate(target);
            }
        }
    }
}
