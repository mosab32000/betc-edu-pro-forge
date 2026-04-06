import unittest
from app.services.vector_memory import VectorMemory


class VectorMemoryTests(unittest.TestCase):
    def test_upsert_and_query_returns_ranked_items(self):
        memory = VectorMemory()
        memory.upsert('1', 'BTEC computing basics', {'lang': 'en'})
        memory.upsert('2', 'دورة في الذكاء الاصطناعي', {'lang': 'ar'})

        results = memory.query('computing', top_k=2)
        self.assertEqual(len(results), 2)
        self.assertEqual({item.id for item in results}, {'1', '2'})


if __name__ == '__main__':
    unittest.main()
