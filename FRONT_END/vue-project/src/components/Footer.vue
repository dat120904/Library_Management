<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2025 Library Management System. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 15px 0;
  text-align: center;
  border-top: 2px solid #007bff;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-content p {
  margin: 0;
  color: #6c757d;
  font-size: 14px;
}
</style>